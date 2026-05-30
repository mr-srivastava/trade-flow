# TradeFlow — Bug & Incident Report

Audit of the Next.js/TypeScript codebase in this folder. Findings are grouped by severity. "Incident" here means user-facing breakage (functional failures, crashes, data loss), since there's no error-tracking/monitoring connected to pull production incidents from.

---

## Critical — user-facing breakage

### 1. All contact & quote forms silently discard submissions (lead loss)
None of the forms send data anywhere. Users get a success message but nothing is stored or emailed.

- `src/components/ContactForm/v2/ContactForm.tsx` — `onSubmit` only does `console.log('Form submitted:', data)`. Used on the landing page and `/contact`.
- `src/components/ContactForm/ContactForm.tsx` (v1, used on product pages) — `onSubmit` runs a `setTimeout` "simulate API call" then shows a **success toast** ("We've received your inquiry…"). No network request.
- `src/components/RequestQuoteForm/RequestQuoteForm.tsx` — same pattern: fake `setTimeout` + "Quote Request Submitted" toast, data thrown away.

**Impact:** every inquiry/quote a customer submits is lost, while they're told it succeeded. This is the most damaging issue on the site.

### 2. Product detail page 500s instead of showing "Not Found"
`src/app/product/[id]/page.tsx` → `generateMetadata` calls `fetchProductById`, which calls `apiCall`. The API route `src/app/api/products/[id]/route.ts` returns **404** for unknown IDs, and `apiCall` (`src/lib/api.ts`) **throws** on 404. Because `generateMetadata` has no try/catch, an invalid product ID throws during metadata generation and renders a server error — *before* the page body runs. The `if (!product) notFound()` guard in the component is therefore unreachable dead code, and the nicely designed `not-found.tsx` page never shows.

### 3. Pagination is broken whenever a search or filter is active
In `src/components/Listing/v2/Listing.tsx`:

- `totalProducts = data.length` (the **unfiltered** count) is used for `totalPages = Math.ceil(totalProducts / productsPerPage)` and for the "Showing X to Y of Z products" label. When a search/filter narrows results, the page count and the count label still reflect *all* products → users see empty pages and a wrong total.
- `currentPage` is **not reset** when `searchQuery` changes. Searching while on page 3 leaves you on page 3 of a now-short list → blank results.
- Filters write `page=1` to the URL (`ProductFilters.tsx` → `params.set('page','1')`), but the Listing never reads the `page` query param — `currentPage` is independent local state. The written `page` param is dead, and filter/pagination state are out of sync.

---

## High

### 4. `total_products` is hardcoded and wrong
`src/lib/data.ts` declares `total_products: 3935`, but the file actually contains **50 products**. Any UI or logic that trusts `total_products` (rather than `products.length`) will be off by ~79x. At minimum it's misleading; if surfaced anywhere it's an outright incorrect stat.

### 5. Client-side search can silently drop products (fragile)
`Listing.tsx` calls `field.toLowerCase()` on `name`, `description`, `cas_number`, and `molecular_formula`. It's wrapped in `try/catch` that returns `false` — so if any of those fields is `null`/`undefined` for a product, that product is **silently removed from the catalogue** instead of erroring. The current 50-row dataset has no nulls in these fields, so it isn't firing today, but the `Product` type allows nulls elsewhere and the real (3,935-row) dataset likely will. Should null-guard explicitly.

---

## Medium

### 6. Debug `console.log` left in production paths
- `src/app/api/products/industries/[industry]/route.ts` — `console.log('Industry:', industry)` on every request.
- `Listing.tsx` `handleSearch` — `console.log('Searching for:', …)`.
- `ContactForm/v2/ContactForm.tsx` — logs full form submissions (also a minor data-in-logs concern).

### 7. Conflicting caching directives
Pages set `export const dynamic = 'force-dynamic'` while `apiCall` requests `next: { revalidate: 3600 }`. `force-dynamic` wins, so the 1-hour revalidate is effectively ignored and the full product payload is re-serialized on every request. Pick one strategy (likely ISR/`revalidate` for this mostly-static data).

### 8. Inconsistent `params` typing across Next conventions
Route handlers type `params` as `Promise<{…}>` and `await` it (Next 15 style), while page components type it as a plain object (Next 14 style). It works on 14.2 only because `await`-ing a non-promise is a no-op. This will break inconsistently on a Next upgrade — standardize on one.

### 9. Redundant double fetch on product detail
`generateMetadata` and `ProductPage` each call `fetchProductById`. Next's per-request fetch cache usually dedupes this, but combined with `force-dynamic` it's worth confirming it isn't doubling work.

---

## Low / cosmetic

10. **Comma separator bug** in category lists (`ProductCard/v2` and `ProductDetails/v2`): the "is this the last item?" check uses value equality (`category !== categories[categories.length-1]`). Duplicate category names break the comma placement. Use the index instead.
11. **Pagination uses `href="#"`** with `preventDefault` — pages aren't shareable/bookmarkable URLs and it's a minor a11y/SEO smell.
12. **Search submit does nothing** — `handleSearch` only logs; filtering is live via `onChange`, so pressing Enter has no effect (harmless but dead code).
13. **README is empty** (just `# TradeFlow`) — no setup/run instructions.
14. **Branding mismatch** — package/repo is "TradeFlow" but all user-facing copy/metadata says "Syntara."
15. **Dead v1 code** — many components ship both an original and a `v2` version; only v2 is wired up. The unused versions add maintenance surface and confusion (note: product detail still imports the *v1* ContactForm/RequestQuoteForm).

---

## Suggested priority order

1. Wire the forms to a real backend/email service (#1) — active lead loss.
2. Wrap `generateMetadata` in try/catch and call `notFound()` (#2).
3. Fix pagination to use filtered counts + reset page on search, and unify filter/page state in the URL (#3).
4. Correct or compute `total_products` (#4) and null-guard search (#5).
5. Remove debug logging and resolve the caching/params inconsistencies (#6–8).

*Note: this is a static review (dependencies aren't installed in this environment, so no build/typecheck/runtime trace was executed). Findings are read from source; the form, metadata, and pagination issues are deterministic from the code.*
