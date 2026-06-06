# Fix Plan for Claude Code — `import-darshin-work`

Repo: `mr-srivastava/trade-flow`, branch `import-darshin-work`.
Stack: Next.js 14.2 (App Router) + TypeScript + Supabase (Postgres via `pg`).

This plan is written for Claude Code to execute. Each item lists the symptom, root cause, the files to touch, the fix, and how to verify. Do them in the order given. After each fix, run `npm run lint` and `npx tsc --noEmit`; do a final `npm run build`.

---

## Architectural context (read first)

Server components fetch the app's **own** HTTP API over an absolute URL built from the request `Host` header:

- `src/lib/endpoint.ts` → `getBaseUrl()` calls `headers().get('host')` and builds `http(s)://<host>/api/...`.
- `src/lib/api.ts` → `apiCall(url)` does `fetch(url, { next: { revalidate: 60 } })`.
- Pages then call these inside a `try/catch` and render a fallback `<div>Failed to load products…</div>` on any error.

This self-fetch-over-HTTP pattern is the root cause of the catalogue bug (item 1) and is fragile in general. The recommended fix is to **query the database directly from server components** and delete the self-fetch layer. This removes `headers()` usage, the absolute-URL dependency, and the error-swallowing `try/catch`.

---

## Bug 1 — Product Category does not open the catalogue (PRIORITY)

**Symptom:** Clicking a card in the landing "Product Categories" section navigates to `/products/industries/<slug>` but the catalogue does not render — the page shows "Failed to load products. Please try again later." (or an empty page).

**Files**
- `src/app/products/industries/[industry]/page.tsx`
- `src/app/products/page.tsx` (same pattern; fix together)
- `src/lib/endpoint.ts`, `src/lib/api.ts`
- `src/app/api/products/route.ts`, `src/app/api/products/industries/[industry]/route.ts`

**Root cause (most likely → least likely; verify in this order):**

1. **`try/catch` swallows Next's `DynamicServerError`.** The page sets `export const revalidate = 60` (ISR / attempts static generation), but the fetch path calls `headers()` (via `getBaseUrl`). During static generation `headers()` throws a `DynamicServerError`, which is meant to bubble up so Next switches the route to dynamic. Instead it is caught by the page's `try { … } catch { return <div>Failed to load products…</div> }`, so the route renders the error fallback and "doesn't open." This bakes the failure into the built/ISR output.
2. **`headers()` + `revalidate` conflict.** Mixing a dynamic function with an ISR `revalidate` is contradictory and makes behavior environment-dependent (works in `next dev`, can fail under `next build`/`next start` or on Vercel).
3. **Self-fetch host resolution.** On a deployed host or behind a proxy, `getBaseUrl()` may build a URL the server can't fetch from itself, causing a 5xx that the `catch` turns into the same fallback.

**Fix (recommended — query the DB directly, delete the self-fetch):**

1. Add a data module `src/lib/products.ts` exporting async functions that run the SQL directly via `query` from `src/lib/db.ts` and map with `rowToProduct` from `src/lib/mappers.ts`:
   - `getAllProducts(): Promise<Product[]>`
   - `getProductsByIndustrySlug(slug: string): Promise<Product[]>`
   - `getProductById(id: string): Promise<(Product & { relatedProducts: Product[] }) | null>`
   - `getIndustryCounts(): Promise<IndustryProductCountMap[]>`
   Move the existing SQL out of the route handlers into these functions (single source of truth).
2. Update server components to call these functions instead of `apiCall(urlMap…)`:
   - `src/app/products/page.tsx` → `const products = await getAllProducts();`
   - `src/app/products/industries/[industry]/page.tsx` → `const products = await getProductsByIndustrySlug(decodeURIComponent(params.industry));`
   - `src/app/product/[id]/page.tsx` → `const product = await getProductById(params.id); if (!product) notFound();`
   - `src/components/ProductCategories/ProductCategories.tsx` → `const all = await getIndustryCounts();`
3. **Remove the broad `try/catch` fallback** in the pages (or keep it but rethrow `DynamicServerError`). With a direct DB call there is no `headers()` and no self-fetch, so the fallback is no longer needed; let real errors surface to `error.tsx`.
4. Keep the `/api/products/*` route handlers (they can call the same `src/lib/products.ts` functions) so any external API consumers still work, but the UI no longer depends on them.
5. `src/lib/endpoint.ts` and the `apiCall` wrapper can be deleted once nothing imports them (grep first).

**Fallback fix (if you must keep the self-fetch):** add `export const dynamic = 'force-dynamic'` to `src/app/products/page.tsx`, `src/app/products/industries/[industry]/page.tsx`, and `src/app/product/[id]/page.tsx`, and remove the `revalidate` export from those pages so `headers()` no longer conflicts with ISR. Also stop swallowing errors in the `catch`.

**Verify**
- `npm run dev`, open `/`, click each category card → the catalogue opens and lists that industry's products (Pharmaceutical 36, Industrial Chemicals 22, Agrochemicals 13, Healthcare 9).
- Hit `/api/products/industries/pharmaceutical` directly → returns a non-empty JSON array.
- `npm run build` completes with no "Dynamic server usage" warning on these routes.

---

## Bug 2 — `parseIndustryToSlug` does not handle special characters

**Symptom:** Industries containing `&` or `/` (e.g. "Beauty & Personal Care", "Flavors & Fragrances", "Food & Nutrition") produce a malformed href like `/products/industries/beauty-&-personal-care`. The `&` is unsafe in a URL path and the slug won't reliably round-trip. (These three are currently hidden via `HIDDEN_CATEGORIES`, so the bug is latent — but it will break the moment they're unhidden, and the DB-side match must agree.)

**Files**
- `src/lib/api.ts` (`parseIndustryToSlug`)
- `src/app/api/products/industries/[industry]/route.ts` (the SQL `regexp_replace` match) — and the new `src/lib/products.ts` if created.

**Root cause:** `parseIndustryToSlug` only does `.replace(/\s+/g, '-').toLowerCase()`. The DB match uses `regexp_replace(lower(ind), '\s+', '-', 'g')`. Neither strips/encodes `&`, `/`, parentheses, etc., and the two must stay identical to round-trip.

**Fix:** make both sides produce the same URL-safe slug. In `parseIndustryToSlug`:
```ts
export const parseIndustryToSlug = (industry: string) =>
  industry
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
```
Mirror it in SQL:
```sql
trim(both '-' from regexp_replace(replace(lower(ind), '&', 'and'), '[^a-z0-9]+', '-', 'g'))
```
Keep the JS and SQL transforms byte-for-byte equivalent. Add a unit test covering `&`, multiple spaces, and trailing punctuation.

**Verify:** temporarily remove an item from `HIDDEN_CATEGORIES`, click it, confirm the catalogue opens; restore the list.

---

## Bug 3 — `headers()` + `revalidate` inconsistency across read routes

**Symptom:** Build-time warnings ("Route couldn't be statically generated because it used `headers`") and unpredictable caching.

**Files:** `src/app/products/page.tsx`, `src/app/products/industries/[industry]/page.tsx`, `src/app/product/[id]/page.tsx`, and the four `src/app/api/products/**` route handlers (all currently `export const revalidate = 60`).

**Root cause:** ISR (`revalidate`) is declared on routes that are inherently dynamic (they use `headers()` and/or per-request DB reads).

**Fix:** once Bug 1 is fixed by direct DB queries, decide one strategy per route and apply consistently:
- Read pages: keep `export const revalidate = 60` (now valid, since `headers()` is gone) **or** `export const dynamic = 'force-dynamic'` if you want always-fresh data. Don't mix both.
- `POST /api/leads`: must stay `export const dynamic = 'force-dynamic'` (writes).

**Verify:** `npm run build` shows each route's render mode with no dynamic-usage warnings.

---

## Bug 4 — Section label vs. behavior mismatch ("Product Categories" lists industries)

**Symptom (minor/UX):** The landing section titled "Product Categories" is populated from `getIndustriesProductCount()` (industries) and links to `/products/industries/<slug>`. Clicking a "category" filters by **industry**, which can confuse.

**Files:** `src/components/ProductCategories/ProductCategories.tsx`, copy in `src/lib/content.ts`.

**Fix (pick one):**
- Rename the section copy to "Browse by Industry" to match behavior, **or**
- Repoint it at real categories: add a `GET /api/products/categories/count` + `getCategoryCounts()` and a `/products/categories/[category]` route mirroring the industries ones, then link cards there.

**Verify:** label and destination agree.

---

## Bug 5 — Server components calling their own API is an anti-pattern (cleanup)

Covered by Bug 1's recommended fix. After migrating to direct DB calls, **grep for leftover usage** of `apiCall` and `urlMap` and delete `src/lib/endpoint.ts` / the `apiCall` export if unused. This also removes an extra network hop per render.

**Verify:** `grep -rn "apiCall\|urlMap\|endpoint" src` returns nothing (or only the deleted-file-free remainder), and the app still builds.

---

## Suggested execution order

1. Bug 1 (direct DB data layer + remove error-swallowing) — fixes the reported "category won't open."
2. Bug 3 (caching directives) — now consistent once self-fetch is gone.
3. Bug 2 (slug special-character handling) — prevents the latent breakage.
4. Bug 5 (delete dead self-fetch code).
5. Bug 4 (label/behavior) — optional polish.

## Global verification checklist

- [ ] `npm run lint` clean
- [ ] `npx tsc --noEmit` clean
- [ ] `npm run build` succeeds, no "Dynamic server usage" warnings
- [ ] `/` renders; every category card opens its catalogue with the right products
- [ ] `/products` lists all 78 products; search, filters, and pagination work
- [ ] `/product/<id>` opens; a bad id renders the not-found page (not a 500)
- [ ] Contact and quote forms still POST to `/api/leads` successfully

## Notes / environment

- Requires `DATABASE_URL` in `.env.local` pointing at Supabase via the **connection pooler** host (`aws-0-<region>.pooler.supabase.com`), not the IPv6-only `db.<ref>.supabase.co`. Percent-encode special chars in the password (`@` → `%40`).
- After bulk DB changes during local dev, clear the cache to see them: `rm -rf .next && npm run dev`.
