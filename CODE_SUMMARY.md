# TradeFlow — Code Summary

A Next.js 14 (App Router) marketing and product-catalogue website for a B2B chemical and pharmaceutical trading platform (branded "Syntara"). Built with TypeScript, Tailwind CSS, and shadcn/ui (Radix) components. The product data is bundled statically and served through internal API routes.

## Tech stack

- **Framework:** Next.js 14.2 (App Router, React 18, server components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + `tailwindcss-animate`, `next-themes` for theming
- **UI components:** shadcn/ui built on Radix primitives (accordion, dialog, select, tabs, etc.)
- **Forms & validation:** `react-hook-form` + `zod` (via `@hookform/resolvers`)
- **Animation:** `framer-motion` / `motion`
- **Other:** `lucide-react` icons, `sonner` toasts, `dotted-map` / world-map visuals, `sharp` for images

## Project structure

```
src/
├── app/                 # Routes (App Router)
│   ├── api/products/     # Internal JSON API over bundled product data
│   ├── products/         # Catalogue listing + per-industry pages
│   ├── product/[id]/     # Product detail page
│   ├── contact/          # Contact page
│   ├── page.tsx          # Home (renders Landing v2)
│   └── layout.tsx        # Root layout, fonts, metadata
├── components/           # Feature + UI components (many have a "v2" variant)
│   └── ui/               # shadcn/ui primitives
├── hooks/                # useCountUp (animated counters)
└── lib/                  # Data, types, API helpers, utils
```

## Routing & pages

- **`/`** — Landing page. `page.tsx` renders `LandingV2`, which composes Navbar, Hero, PlatformBenefits, ProductCategories, About, ContactUs, and Footer. Page copy comes from `lib/content.ts`.
- **`/products`** — Server-rendered catalogue (`force-dynamic`). Fetches all products via the internal API and renders the v2 `Listing` component.
- **`/products/industries/[industry]`** — Catalogue filtered to a single industry.
- **`/product/[id]`** — Product detail page with dynamic `generateMetadata` (title/description from the product) and a `not-found` fallback. Has dedicated `loading.tsx` states.
- **`/contact`** — Contact page.

## Data layer

The catalogue is **not backed by an external database** — all product data lives in `src/lib/data.ts` (~7,500 lines, `total_products: 3935`) typed by the rich `Product` interface in `lib/types.ts` (CAS number, molecular formula, certificates, safety/hazard, applications, etc.).

The app exposes this data through internal Next.js API routes that read from `data.ts`:

| Route | Purpose |
|---|---|
| `GET /api/products` | Return all products |
| `GET /api/products/[id]` | Return one product + up to 3 related items (matched by shared category/industry) |
| `GET /api/products/industries/[industry]` | Products filtered by industry slug |
| `GET /api/products/industries/count` | Per-industry product counts |

Supporting helpers in `lib/`:

- **`api.ts`** — `apiCall()` fetch wrapper with status-code error handling (401/403/404/5xx) and one-hour revalidation; `parseIndustryToSlug()`.
- **`endpoint.ts`** — `urlMap` builds absolute API URLs from the request host (works in both localhost and production).
- **`content.ts`** — Static landing-page copy (hero, benefits, about, stats).
- **`types.ts`** — Domain types (`Product`, `ProductsResponse`, plus v2 page-content types).
- **`utils.ts`**, **`icon-util.tsx`** — Tailwind `cn()` merge helper and icon mapping.

## Components

Organized by feature (Hero, About, Features, Footer, ProductCard, ProductDetails, ProductFilters, Listing, etc.), with `ui/` holding reusable shadcn primitives. Notably, many features ship **both an original and a `v2` version**; the live site currently wires up the v2 variants (e.g. `Landing/v2`, `Listing/v2`, `ProductDetails/v2`), suggesting a design refresh where the older versions remain in the tree but unused.

## Observations

- **Branding mismatch:** the package is `trade-flow` / repo "TradeFlow", but user-facing metadata and copy brand it **"Syntara."**
- **Static data as source of truth:** the API routes are a thin layer over an in-repo dataset rather than a real backend — simple to deploy, but updates require code changes and the 7.5k-line `data.ts` is large to ship.
- **v1/v2 duplication:** legacy component versions still live alongside the active v2 ones, worth pruning to reduce maintenance surface.
- **README is essentially empty** (just the title) — no setup or run instructions documented.

## Running the project

```
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
npm run lint
```
