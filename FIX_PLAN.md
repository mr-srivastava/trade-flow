# TradeFlow — Bug Fix Plan

A plan to finalize the approach before writing code. Covers the six items from the bug review. Decisions already made:

- **Database access:** direct Postgres using `pg` (node-postgres) with the Supabase connection string. Password supplied via env file.
- **Product data:** migrate products out of `src/lib/data.ts` into Supabase; serve listings and a real `COUNT(*)` from the DB.

---

## 0. Foundation — Supabase + env setup

**Connection string (provided):**
```
postgresql://postgres:[YOUR-PASSWORD]@db.rnytofwhdyuqhjruspib.supabase.co:5432/postgres
```

**Env file** — create `.env.local` (git-ignored) at the project root:
```
# Supabase Postgres
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD_HERE@db.rnytofwhdyuqhjruspib.supabase.co:5432/postgres
```
You paste your real password in place of `YOUR_PASSWORD_HERE`. Also add `.env.example` (committed, no secret) documenting the variable, and confirm `.env*.local` is in `.gitignore`.

**Dependencies:** `npm install pg` and `npm install -D @types/pg`.

**DB client module** — new file `src/lib/db.ts`:
- Creates a single shared `pg.Pool` from `process.env.DATABASE_URL` (pooled, with `ssl: { rejectUnauthorized: false }` since Supabase requires SSL).
- Guards against multiple pools during dev hot-reload by caching the pool on `globalThis`.
- Exports a small `query()` helper.

**Three tables:** `products` (lightweight fields the catalogue/listing needs), `product_details` (the full detail-page payload, 1:1 with `products`), and `leads`. `products` is created first so both `product_details.product_id` and `leads.product_id` can reference it.

```sql
-- 1. Catalogue/listing fields (used by /products and ProductCard)
create table if not exists products (
  id text primary key,
  name text not null,
  cas_number text,
  molecular_formula text,
  categories text[] default '{}',
  industries text[] default '{}',
  sub_categories text[] default '{}',
  product_images text[] default '{}',
  is_exclusive boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists products_name_idx on products (name);
create index if not exists products_industries_idx on products using gin (industries);
create index if not exists products_categories_idx on products using gin (categories);

-- 2. Everything shown on the product DETAILS page, 1:1 with products
create table if not exists product_details (
  product_id text primary key references products(id) on delete cascade,
  description text,
  einecs_number text,
  hsn_no text,
  iupac_name text,
  synonyms text,
  shelf_life text,
  storage_conditions text,
  -- structured/repeating sections kept as jsonb (arrays of {key,value} etc.)
  properties jsonb default '[]',
  safety_and_hazard jsonb default '[]',
  applications jsonb default '[]',
  storage jsonb default '[]',
  certificates jsonb default '[]',
  faq jsonb default '[]',
  -- any remaining fields from the rich Product type, preserved verbatim
  extra jsonb default '{}',
  updated_at timestamptz default now()
);

-- 3. Leads / inquiries
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('contact','quote')),
  name text not null,
  email text not null,
  company text,
  phone text,
  subject text,
  message text,
  quantity text,
  requirements text,
  -- product-detail inquiries/quotes link back to the product they came from
  product_id text references products(id) on delete set null,
  product_name text,             -- denormalized snapshot, survives product deletion
  created_at timestamptz not null default now()
);
create index if not exists leads_product_id_idx on leads (product_id);
```

**Why split `products` / `product_details`:** the listing page only needs a handful of columns per row (name, CAS, formula, images, categories, exclusivity), while the details page needs the full heavy payload (description, certificates, properties, hazards, FAQ, etc.). Splitting keeps the catalogue query light (no big jsonb blobs over the wire for 1000s of rows) and gives the details page its own focused table. The relationship is **1:1 via `product_details.product_id → products(id)`** with `on delete cascade` (delete a product, its details go too). Frequently-queried scalars are promoted to real columns; irregular/repeating structures (properties, certificates, hazards, applications, storage, faq) stay as `jsonb`, with an `extra` jsonb catch-all so no field from the original `Product` type is lost.

**Foreign key — `leads.product_id → products(id)`:** leads submitted from a product detail page (the v1 contact form and the request-quote form) carry the `product_id` as a real foreign key, so each inquiry/quote is tied to its product and can be joined for reporting (e.g. "inquiries per product"). It's **nullable** because generic contact/landing-page submissions have no product. `on delete set null` keeps the lead row if a product is later removed, and `product_name` is also stored as a denormalized snapshot so the lead is still readable even if the product is gone. The products migration (section 4) must run **before** any product-linked lead is inserted, or the FK insert will fail.

---

## 1. Persist leads to Supabase (forms)

**Goal:** every contact/quote submission is written to the `leads` table; success toast only fires on a real 200.

**New API route** `src/app/api/leads/route.ts`:
- `POST` handler, validates body with the same zod schema (shared), inserts into `leads` via `db.query(...)`, returns `{ ok: true }` or a 400/500.
- When `product_id` is present, it's written to the FK column; if the referenced product doesn't exist the insert fails with a 23503 (FK violation) → return a clear 400 rather than a 500.
- Marks `export const dynamic = 'force-dynamic'` (writes must never be cached).

**Wire up the three forms** (replace the fake/`console.log` submit handlers with a `fetch('/api/leads', { method:'POST', body: JSON.stringify(...) })`):
- `src/components/ContactForm/v2/ContactForm.tsx` — `type: 'contact'`, no product. Add loading + error states; toast only on success.
- `src/components/ContactForm/ContactForm.tsx` (v1, product pages) — `type: 'contact'`, sends `product_id` (FK) + `product_name`. Replace the `setTimeout` simulation.
- `src/components/RequestQuoteForm/RequestQuoteForm.tsx` — `type: 'quote'`, sends `product_id` (FK) + `product_name`, `quantity`, `requirements`.

**Error handling:** on non-200, show an error toast and keep the dialog open so the user can retry (no more silent "success").

---

## 2. Product Details page — suggested fix

**Problem:** `generateMetadata` calls `fetchProductById`, which throws on a 404, producing a 500 before the page renders; the `notFound()` guard and `not-found.tsx` are unreachable.

**Fix:**
1. Change `fetchProductById` to **return `null` on a 404** instead of throwing. Cleanest: have it catch the not-found case (or check `res.status === 404` directly) and return `null`; re-throw only on genuine 5xx/network errors.
2. In `generateMetadata`: if product is `null`, return minimal fallback metadata (`title: 'Product Not Found'`) instead of throwing.
3. In `ProductPage`: keep `if (!product) notFound();` — now reachable, so `not-found.tsx` renders correctly.
4. Wrap both call sites defensively so a DB/network error renders a friendly error rather than a raw stack.

Once products come from the DB (section 4), the detail route's lookup becomes a `SELECT … WHERE id = $1`; the same null-on-miss contract applies.

**Lead persistence from the product detail page:** the inquiry and quote forms on this page submit through the same `/api/leads` route (section 1) and persist with `product_id` as a **foreign key to `products(id)`**. Because the FK requires the product to exist, the product detail flow depends on the products migration (section 4) being done first. Each product-page lead is therefore queryable by product (e.g. join `leads` → `products`, or `select product_id, count(*) from leads group by product_id`).

---

## 3. Pagination — suggested fix

**Problems:** total pages and the "showing X of Y" label use the unfiltered count; `currentPage` doesn't reset on search; the `page` URL param written by filters is never read.

**Fix (patch within `Listing/v2/Listing.tsx`):**
1. Split filtering from slicing: compute `const matched = data.filter(...)` (full filtered set), derive `const totalFiltered = matched.length`, then `const pageItems = matched.slice(start, end)`.
2. Drive pagination off `totalFiltered`: `totalPages = Math.ceil(totalFiltered / productsPerPage)` and label "Showing … of {totalFiltered}".
3. Reset to page 1 when the query or filters change — `useEffect(() => setCurrentPage(1), [searchQuery, currentIndustry, currentCategory, currentSubcategory])`.
4. Make page state the single source of truth: read the initial page from the `page` search param (so the `page=1` that filters already write is honored), and either keep page in local state consistently or push it to the URL — pick one. Recommended minimal patch: read `page` from the URL on mount and on filter change, keeping everything in sync without a larger rewrite.

(With server-side DB paging in section 4, an alternative is to paginate in the query via `LIMIT/OFFSET`. For this pass we keep client-side paging and just fix the counting/reset bugs.)

---

## 4. total_product count from the database

Since products migrate to Supabase (into the `products` + `product_details` tables from section 0):

1. **Migration script** `scripts/migrate-products.ts` (run once): reads the existing `src/lib/data.ts` and, for each product, writes **two rows in one transaction**:
   - into `products`: the listing scalars/arrays (`id`, `name`, `cas_number`, `molecular_formula`, `categories`, `industries`, `sub_categories`, `product_images`, `is_exclusive`);
   - into `product_details`: the detail-page payload (`description`, `einecs_number`, `hsn_no`, `iupac_name`, `synonyms`, `shelf_life`, `properties`, `safety_and_hazard`, `applications`, `storage`, `certificates`, `faq`), with any leftover `Product` fields dropped into `extra`.
   Idempotent via `on conflict (id/product_id) do update`. Insert `products` before `product_details` (FK order).
2. **Rewrite the product API routes to read from the DB:**
   - `GET /api/products` → `SELECT … FROM products` (light columns only) + `SELECT count(*)`, returns `{ total_products: <count>, products: [...] }` where `total_products` is the **real DB count**, not a hardcoded 3935. Does *not* join `product_details` (listing doesn't need it).
   - `GET /api/products/[id]` → join `products` + `product_details` on `product_id` (`SELECT … WHERE p.id = $1`), reassemble into the `Product` shape the detail page expects; compute related products from `products`. Returns `null`/404 on miss (ties into section 2).
   - `GET /api/products/industries/[industry]` and `/industries/count` → query/aggregate from `products` using the GIN-indexed `industries` array.
3. Remove the hardcoded `total_products: 3935`. `data.ts` is retired after migration (or kept only as the migration seed source).

**Type/shape note:** the detail route must rehydrate the split tables back into the existing `Product` interface so `ProductDetails/v2` and `ProductCard` keep working without component changes. Keep a single mapper (`rowToProduct()`) in `src/lib/db.ts` or a `mappers.ts` so both the list and detail routes stay consistent.

**Open consideration:** loading all products into the client for client-side filtering won't scale to thousands of rows. Acceptable for this pass; flagged as a follow-up to move filtering/paging server-side (now easier since `products` is the light table).

---

## 5. Remaining medium items — leave as-is, patch only

Per direction ("let it be for now, do a patch fix"), no architectural refactor here — just quick, safe patches:

- **Remove debug `console.log`s:** `api/products/industries/[industry]/route.ts`, `Listing.tsx` `handleSearch`, and the form submission log in `ContactForm/v2`.
- **Null-safe search:** in `Listing.tsx`, guard the search fields with optional chaining / nullish fallback (`(field ?? '').toLowerCase()`) so products with a missing field aren't silently dropped — replaces reliance on the try/catch.
- **Defer** the deeper `params` typing standardization (Next 14 vs 15 style) and the double-fetch dedupe; note them as known tech debt, not part of this pass.

---

## 6. Consistent caching directives

Decide one strategy and apply it uniformly:

- **Read pages** (`/products`, `/products/industries/[industry]`, `/product/[id]`): use **ISR** — `export const revalidate = 3600` and **remove `export const dynamic = 'force-dynamic'`**. Align `apiCall`'s `next: { revalidate: 3600 }` with the page so they no longer contradict.
- **Lead writes** (`/api/leads`): explicitly `dynamic = 'force-dynamic'` / `no-store` — never cached.
- **Product API GETs:** allow caching consistent with the 1-hour revalidate so the DB isn't hit on every request.

Net: one coherent rule — product reads cached/revalidated hourly, lead writes always dynamic.

---

## Suggested sequencing

| Phase | Work | Depends on |
|---|---|---|
| A | Env file, `.gitignore`, `pg` install, `src/lib/db.ts`, schema in Supabase | — |
| B | `/api/leads` route + wire the 3 forms (item 1) | A |
| C | Migrate products to DB + rewrite product API routes + real count (item 4) | A |
| D | Product detail null-on-miss + `notFound()` (item 2) | C |
| E | Pagination counting/reset fix (item 3) | C |
| F | Caching directives (item 6) + patch cleanup (item 5) | B–E |

The generic contact form (landing/`/contact`, no `product_id`) only needs A. But the **product-linked** leads (v1 contact + request-quote forms) have a FK to `products`, so they need **C done first** — schedule C before, or alongside, the product-page form wiring.

---

## Risks & open questions

- **Secrets:** the password must only live in `.env.local` (never committed). If the connection string was shared anywhere public, rotate the DB password in Supabase.
- **SSL:** Supabase requires SSL; the `pg` pool must set it or connections fail.
- **Client payload size:** serving all products to the browser for client-side filtering is fine now but won't scale — server-side filtering/paging is the natural follow-up.
- **Migration re-runs:** keep the product migration idempotent (`on conflict do update`) so it's safe to re-run.
- **No tests/CI:** changes will be verified by local build/lint and manual smoke tests; consider adding a minimal test for the leads endpoint.
