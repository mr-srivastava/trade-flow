# Implementation Plan — "Top Items" on the Home Screen

> For Claude Code. Read this top to bottom before editing. Decisions already made by the product owner:
> **(1) Storage = DB flag** (mirror the existing `is_exclusive` pattern). **(2) Missing molecules = create full product entries.**

---

## 1. Context (what already exists)

- **Stack:** Next.js (App Router) + Supabase Postgres, accessed through a thin server-side data layer (`src/lib/products.ts` → `src/lib/db.ts` `pg` pool). Components consume the rich `Product` type via `rowToProduct` in `src/lib/mappers.ts`.
- **Schema** (`schema.sql`): `products` (listing columns incl. `is_exclusive boolean`), `product_details` (1:1, holds description/properties/etc. as columns + jsonb), `leads`.
- **Home page** render path: `src/app/page.tsx` → `LandingV2` (`src/components/Landing/v2/Landing.tsx`). Current sections in order: `Hero`, `PlatformBenefits`, `ProductCategories`, `AboutSection`, `ContactSection`, `Footer`. **There is no top/featured-products section today.**
- **Reusable card:** `src/components/ProductCard/v2/ProductCard.tsx` already renders a `Product` (image, name, categories, CAS, formula, exclusive badge) and links to `/product/[id]`. Reuse it — do not build a new card.
- **Existing precedent for a "flag" column:** `is_exclusive` flows end-to-end (schema → `ProductRow` in mappers → `rowToProduct` → Card badge). The Top Items flag will follow the exact same path.
- **Supabase project id:** `rnytofwhdyuqhjruspib`.

### Catalog status of the 18 target molecules
> **Verified against live DB `rnytofwhdyuqhjruspib` (2026-06-28).** 10 molecules already exist; 8 must be created (7 truly missing + Dexamethasone Sodium Phosphate, which does **not** exist as a separate row — only base `Dexamethasone` does). 10 + 8 = **18**.

Already in `products` (feature by flagging the existing row — ids verified):
`Atenolol` (`1c1df3b543ae82f03454bdda`), `Ciprofloxacin` (`189aaf27c9756c9b0a2beb23`), `Ketorolac` (`9362af3f5ad5fab1859b8705`), `Fexofenadine` (`3eb4c17b5db1dfc54632cd8d`), `Fluconazole` (`3085eab7af3329cb182db4b6`), `Montelukast` (`f904d6c7db64c3b3907bc7ce` → rename **Montelukast Sodium**), `Cetirizine` (`417309993f1cf40f12bba3dc` → rename **Cetirizine HCl**), `Cefixime` (`9722584715afc52b873b5c98` → rename **Cefixime Trihydrate**), `Dexamethasone` (`5663924e62525d2b5297c451`), `Amoxycillin` (`408a1b9e9b775de16662371d` → rename **Amoxicillin**).

Not in catalog (must be created — 8):
`Sildenafil Citrate`, `Tadalafil`, `Sodium Picosulfate`, `Cefuroxime Axetil`, `Cefpodoxime Proxetil`, `Flucloxacillin`, `Cyproheptadine`, **`Dexamethasone Sodium Phosphate`** (CAS 2392-39-4 — created as a NEW row distinct from base Dexamethasone, per product-owner decision to land 18 total).

> Renames of existing rows are real `update products set name = …` statements (see §3b) — the DB currently stores the short forms.
> Junk to ignore: a stray `Fexo 2` (`66ed12ba8f07469ef225317c`) sits next to real `Fexofenadine` — do **not** flag it `is_top`.

---

## 2. Database changes (migration)

Use Supabase `apply_migration` (DDL). Add two columns to `products`:

```sql
alter table products add column if not exists is_top boolean default false;
alter table products add column if not exists top_rank integer;          -- lower = shown first; null = unranked
create index if not exists products_is_top_idx on products (is_top) where is_top;
```

Then also update `schema.sql` in the repo so the canonical schema stays in sync (add the two columns + index under the `products` table block).

---

## 3. Seed / flag the data

### 3a. Create the 8 missing products
For each missing molecule insert a row into `products` and a matching row into `product_details`. Follow the field conventions in `src/lib/data.ts` (rich `Product` shape) and the column split in `schema.sql`. Minimum required columns for a clean listing + detail page:

`products`: `id` (24-char hex, same style as existing ids — generate), `name`, `cas_number`, `molecular_formula`, `categories` (`{'Pharmaceutical Actives & Precursors'}`), `industries` (`{'Pharmaceutical'}`), **`product_images = '{}'`** (empty — `ProductCard` then renders its "No image available" fallback; `next/image` only whitelists `cdn.scimplify.com` in `next.config.mjs`, so do NOT point at an arbitrary remote URL), `is_top`, `top_rank`.
`product_details`: `product_id`, `description`, plus `iupac_name`/`synonyms`/`hsn_no` where known.

Reference data for the 8 (CAS + formula; ids pre-generated):
- Sildenafil Citrate — CAS 171599-83-0 — C22H30N6O4S·C6H8O7 — id `c49213b17f51c789c9ab00db`
- Tadalafil — CAS 171596-29-5 — C22H19N3O4 — id `fc861fd83f136136e1fdd79d`
- Sodium Picosulfate — CAS 10040-45-6 — C18H13NNa2O8S2 — id `7496fab1b30b2ea5c7024852`
- Cefuroxime Axetil — CAS 64544-07-6 — C20H22N4O10S — id `db08d729a67af915502ca157`
- Cefpodoxime Proxetil — CAS 87239-81-4 — C21H27N5O9S2 — id `70fbc862af107a050b2dd076`
- Flucloxacillin — CAS 5250-39-5 — C19H17ClFN3O5S — id `c7136ddc24e90ca5b87b4417`
- Cyproheptadine — CAS 129-03-3 — C21H21N — id `7fd005044153f2b5bda2a52c`
- Dexamethasone Sodium Phosphate — CAS 2392-39-4 — C22H28FNa2O8P — id `b89733c3dec9f7998474b927`

### 3b. Rename existing rows, then flag all 18 as top + assign rank
First the 4 renames (existing rows store short forms):
```sql
update products set name = 'Montelukast Sodium'  where id = 'f904d6c7db64c3b3907bc7ce';
update products set name = 'Cetirizine HCl'       where id = '417309993f1cf40f12bba3dc';
update products set name = 'Cefixime Trihydrate'  where id = '9722584715afc52b873b5c98';
update products set name = 'Amoxicillin'          where id = '408a1b9e9b775de16662371d';
```
Then `update products set is_top = true, top_rank = <n> where id = '<id>';` for each of the 18, in the display order below. `top_rank` is sparse (10, 20, 30…) so reordering later is easy:

| rank | name | id |
|---|---|---|
| 10 | Sildenafil Citrate | c49213b17f51c789c9ab00db |
| 20 | Tadalafil | fc861fd83f136136e1fdd79d |
| 30 | Atenolol | 1c1df3b543ae82f03454bdda |
| 40 | Montelukast Sodium | f904d6c7db64c3b3907bc7ce |
| 50 | Cetirizine HCl | 417309993f1cf40f12bba3dc |
| 60 | Fexofenadine | 3eb4c17b5db1dfc54632cd8d |
| 70 | Cyproheptadine | 7fd005044153f2b5bda2a52c |
| 80 | Ciprofloxacin | 189aaf27c9756c9b0a2beb23 |
| 90 | Amoxicillin | 408a1b9e9b775de16662371d |
| 100 | Flucloxacillin | c7136ddc24e90ca5b87b4417 |
| 110 | Cefixime Trihydrate | 9722584715afc52b873b5c98 |
| 120 | Cefuroxime Axetil | db08d729a67af915502ca157 |
| 130 | Cefpodoxime Proxetil | 70fbc862af107a050b2dd076 |
| 140 | Fluconazole | 3085eab7af3329cb182db4b6 |
| 150 | Ketorolac | 9362af3f5ad5fab1859b8705 |
| 160 | Dexamethasone | 5663924e62525d2b5297c451 |
| 170 | Dexamethasone Sodium Phosphate | b89733c3dec9f7998474b927 |
| 180 | Sodium Picosulfate | 7496fab1b30b2ea5c7024852 |

> Do 3a/3b via `apply_migration` or `execute_sql` against project `rnytofwhdyuqhjruspib`. Use parameterised/escaped values — molecule names are trusted but keep SQL clean.

---

## 4. Data layer (`src/lib/products.ts` + `src/lib/mappers.ts`)

1. **mappers.ts** — **no change.** `is_top`/`top_rank` are used only for the `WHERE`/`ORDER BY` of `getTopProducts` (both reference `p.*` straight from the `products` table), and the marquee orders via SQL — so neither needs to land on the `Product` type or `ProductRow`. Keep the data layer minimal.
2. **products.ts** — leave `LISTING_SELECT` unchanged (it's a `columns + from + join` fragment; the new columns don't need selecting). Add a new function:

```ts
/** Featured "Top Items" for the home page, ordered by top_rank then name. */
export async function getTopProducts(limit = 18): Promise<Product[]> {
  const rows = await query<ProductRow>(
    `select ${LISTING_SELECT}
     where p.is_top
     order by p.top_rank nulls last, p.name
     limit $1`,
    [limit],
  );
  return rows.map((row) => rowToProduct(row));
}
```

(`select ${LISTING_SELECT} where p.is_top …` expands correctly because the fragment ends at the JOIN predicate.)

---

## 5. New home-page section component — auto-scrolling marquee carousel

> UX decision (inspired by distil.market's "Backed By Institutions" row): render the top items as a **continuously auto-scrolling horizontal marquee** that loops seamlessly, sits on a **tinted band**, lets items **bleed off both edges**, and **pauses on hover**. Unlike distil's logos, **each card is clickable** and links to its product detail page. Dependency-free (pure CSS keyframes) — do not add a carousel library.

Two files (server fetch + client marquee):

**`src/components/TopProducts/TopProducts.tsx`** — async **server** component (same pattern as `ProductCategories`), props `{ topProducts: TopProductsContent }`:
- Call `getTopProducts()`; `if (!products.length) return null;`.
- Render the section shell on a tinted band (e.g. `bg-syntara-darker` / a light blue like distil), `id="top-products"`, centered heading/subtitle reusing the `ProductCategories` classes (`topProducts.title` / `topProducts.subtitle`), then render the client marquee passing `products`.

**`src/components/TopProducts/TopProductsMarquee.tsx`** — `'use client'`:
- A full-width `overflow-hidden` viewport. Inside, a flex track that holds the product list **rendered twice back-to-back** (the duplicate makes the loop seamless).
- Animate the track with a CSS keyframe: `@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`, `animation: marquee 40s linear infinite;` (speed ∝ item count — tune so it reads calmly). Add `@media (prefers-reduced-motion: reduce)` to disable the animation (falls back to a normal horizontally-scrollable row).
- `:hover` on the track sets `animation-play-state: paused` so users can read/aim at a card.
- Each item is the existing `ProductCard` (`@/components/ProductCard/v2/ProductCard`) wrapped in a fixed-width slide (`w-[260px] md:w-[280px] shrink-0`). `ProductCard` already wraps everything in a `Link href="/product/[id]"`, so **cards are clickable out of the box** — the duplicated set links to the same products (set `aria-hidden`/`tabindex=-1` on the duplicate to avoid double focus stops).
- Soft fade masks on the left/right edges (CSS `mask-image: linear-gradient(...)` or gradient overlays matching the band color) to mimic distil's edge bleed.
- Accessibility: viewport `role="region" aria-label="Top products"`; duplicate set hidden from AT. Optional trailing "View all products" `Link href="/products"` (reuse `btn-primary`) below the marquee.

---

## 6. Wire into the home page

1. **`src/lib/content.ts`** — add a `topProducts: { title, subtitle, buttonText }` block (e.g. title "Top Products", subtitle "Our most-requested APIs & intermediates"). Add a `TopProductsContent` interface to `src/lib/types.ts` and include it on `PageContent`.
2. **`src/components/Landing/v2/Landing.tsx`** — import `TopProducts` and place it **immediately under `<ProductCategories />`** ("Browse by Industry"), before `<AboutSection />`. So the section order becomes: Hero → PlatformBenefits → ProductCategories → **TopProducts** → About → Contact → Footer. Pass it with a **named prop matching the codebase convention** (Landing uses `productCategories={…}`, `benefits={…}` — never a generic `content=`): `<TopProducts topProducts={pageContent.topProducts} />`. `Landing.tsx` itself stays a plain (non-async) component; `TopProducts.tsx` is the async fetch boundary, exactly like `ProductCategories`.

---

## 7. Verification (do all before calling it done)

1. `npm run build` (or `next build`) — must pass type-check; the async server component + new content types are the main risk.
2. `npm run dev` and load `/` — Top Products section renders with all 18 cards, correct names/spellings, images or graceful "No image" fallback.
3. Click 2–3 cards (one created, one pre-existing) → `/product/[id]` detail page loads (confirms the new rows + details are valid).
4. Confirm ordering matches `top_rank`.
5. DB sanity: `select name, top_rank from products where is_top order by top_rank;` returns exactly **18** rows (the 8 created + 10 existing), no duplicates, names spelled per the corrected list (`Montelukast Sodium`, `Cetirizine HCl`, `Cefixime Trihydrate`, `Amoxicillin`, both Dexamethasone entries present).
6. New rows render the **"No image available"** fallback (not a broken `next/image`) — confirms `product_images = '{}'`.
7. Confirm `schema.sql` updated so a fresh DB bootstrap includes the new columns.

---

## 8. Files touched (summary)
- `schema.sql` — add `is_top`, `top_rank`, index.
- DB migration — same DDL + inserts/updates against project `rnytofwhdyuqhjruspib`.
- `src/lib/mappers.ts` — **no change** (is_top/top_rank not surfaced to the UI).
- `src/lib/products.ts` — `getTopProducts()` (LISTING_SELECT unchanged).
- `src/lib/types.ts` — `TopProductsContent`, add to `PageContent`.
- `src/lib/content.ts` — `topProducts` content block.
- `src/components/TopProducts/TopProducts.tsx` — **new** (server: fetch + section shell).
- `src/components/TopProducts/TopProductsMarquee.tsx` — **new** (`'use client'`: auto-scroll marquee, pause-on-hover, clickable cards).
- `src/components/Landing/v2/Landing.tsx` — import + place section under "Browse by Industry" (ProductCategories).
- `src/components/ProductCategories/ProductCategories.tsx` — add background-image treatment to industry cards (see §10).
- `public/industries/*.jpg` — **new** 4 background images (see §10).

## 9. Out of scope / follow-ups
- Admin UI to toggle `is_top` (currently DB-only; matches `is_exclusive`).
- Manufacturer/supplier modeling (Rakshit, Virupaksha, Ceph…) — the source list groups by supplier, but the schema has no supplier concept. Not needed for "Top Items"; raise separately if required.
- Enriching the 7 new products with full properties/COA/applications later.

---

## 10. "Browse by Industry" — background-image cards (distil.market style)

Distil's "Key Industry Segments" cards are **full-bleed photo cards** with the industry name overlaid bottom-left in white over a dark bottom-up gradient (for legibility), and a subtle zoom on hover. Apply the same treatment to the existing `ProductCategories` cards.

> **Status:** the component change in §10b is **implemented** — it checks `public/industries/<slug>.jpg` at server-render time and shows the photo card when the file exists, otherwise keeps the current flat `glass-card`. The 4 photos themselves are **not committed**: Unsplash's `/download` endpoint returns **403** without an API key, so the jpgs must be added manually (or via an Unsplash API key / browser download). Until then all 4 cards render the existing glass-card look unchanged — no regression.

### 10a. Images (sourced from Unsplash — free license, attribution appreciated not required)
The 4 currently-visible industries (after the existing `HIDDEN_CATEGORIES` filter) and their chosen photos:

| Industry | Photo | Unsplash ID | Download URL |
|---|---|---|---|
| Pharmaceutical | Blue & white pills on light blue | `8e8Stpw4Gr8` | `https://unsplash.com/photos/8e8Stpw4Gr8/download?w=1600` |
| Agrochemicals | Rows of green crops, soft light | `elcVuEs24Bc` | `https://unsplash.com/photos/elcVuEs24Bc/download?w=1600` |
| Healthcare | Doctor holding red stethoscope | `hIgeoQjS_iE` | `https://unsplash.com/photos/hIgeoQjS_iE/download?w=1600` |
| Industrial Chemicals | Stainless-steel plant tanks & pipes | `YffeRZ-Q8us` | `https://unsplash.com/photos/YffeRZ-Q8us/download?w=1600` |

Download each into `public/industries/` as a slug matching `parseIndustryToSlug(name)`:
`pharmaceutical.jpg`, `agrochemicals.jpg`, `healthcare.jpg`, `industrial-chemicals.jpg`.
(Optimize to ~1600px wide, ~80% quality. Using local files means **no `next.config` change** — CSS `background-image` doesn't go through `next/image`'s `remotePatterns`.)

> If a new industry appears later with no matching file, fall back to the current flat `glass-card` style or a default gradient. Keep the lookup tolerant of a missing image.

### 10b. Component change (`ProductCategories.tsx`)
- Map each `industry.name` → `/industries/${parseIndustryToSlug(industry.name)}.jpg` (a small helper; reuse the existing `parseIndustryToSlug`).
- Replace the flat `glass-card` `Link` with an image card: a relatively-positioned block, fixed height (e.g. `h-56`), `bg-cover bg-center` using inline `style={{ backgroundImage: 'url(...)' }}`, `rounded-xl overflow-hidden`, `group`.
- Add an absolute dark gradient overlay: `bg-gradient-to-t from-black/70 via-black/20 to-transparent`.
- Industry name + count + "Explore products →" sit absolutely at the **bottom-left in white** (`text-white`, drop the dark-on-light classes). Count pill stays but restyled for dark bg.
- Hover: `group-hover:scale-105 transition-transform` on the image layer (subtle zoom), keep the whole card a `Link`.
- Keep the responsive `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5` and the `Reveal` stagger.

### 10c. Verification additions
- All 4 industry cards show their photo, name readable over the gradient at the smallest breakpoint, hover zoom smooth.
- CLS sanity: images sized so they don't cause layout shift (fixed card height).
- Confirm slugs line up: `parseIndustryToSlug('Industrial Chemicals') === 'industrial-chemicals'` etc., so the right photo loads.
