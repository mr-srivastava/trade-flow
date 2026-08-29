# TradeFlow

TradeFlow is a Next.js marketing and product-catalogue site for a B2B
chemical and pharmaceutical trading platform. The user-facing brand is
**Syntaraa**; the repository and package name remain `trade-flow`.

## Features

- Landing page with hero, platform benefits, product categories, about, and
  contact sections
- Searchable product catalogue with industry filters
- Product detail pages with specs, certificates, safety data, and FAQs
- Contact and quote request forms that persist leads to the database
- Internal JSON API for products and lead submission

## Tech stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui (Radix primitives)
- **Database:** PostgreSQL on Supabase via `pg`
- **Forms:** react-hook-form + Zod
- **Animation:** Framer Motion

## Prerequisites

- Node.js 18 or later
- npm
- A Supabase (or other Postgres) database with SSL enabled

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create `.env.local` at the project root:

```bash
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/postgres
```

Use your Supabase connection string (pooler or direct). The app requires SSL;
see `src/lib/db.ts` for pool configuration.

### 3. Set up the database schema

Apply the schema once in the Supabase SQL editor, or from the CLI:

```bash
psql "$DATABASE_URL" -f schema.sql
```

This creates `products`, `product_details`, and `leads` tables.

### 4. Seed product data

The catalogue source of truth in the repo is `src/lib/data.ts` (~3,900
products). Load it into Postgres with the migration script:

```bash
npm run db:migrate
```

The script is idempotent; re-running it upserts the same rows.

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command                | Description                                     |
| ---------------------- | ------------------------------------------------ |
| `npm run dev`          | Start the development server                    |
| `npm run build`        | Production build                                |
| `npm run start`        | Serve the production build                      |
| `npm run lint`         | Run oxlint                                      |
| `npm run lint:fix`     | Run oxlint with auto-fix                        |
| `npm run format`       | Run oxfmt                                       |
| `npm run format:check` | Check formatting with oxfmt                     |
| `npm run db:migrate`   | Seed or refresh products from `src/lib/data.ts` |

## Routes

| Path                              | Description                    |
| --------------------------------- | ------------------------------ |
| `/`                               | Landing page                   |
| `/products`                       | Full product catalogue         |
| `/products/industries/[industry]` | Catalogue filtered by industry |
| `/product/[id]`                   | Product detail page            |
| `/contact`                        | Contact page                   |

## API

| Method | Route                                 | Description                                    |
| ------ | ------------------------------------- | ---------------------------------------------- |
| `GET`  | `/api/products`                       | List all products (cached, revalidates hourly) |
| `GET`  | `/api/products/[id]`                  | Single product with related items              |
| `GET`  | `/api/products/industries/[industry]` | Products for one industry                      |
| `GET`  | `/api/products/industries/count`      | Product counts per industry                    |
| `POST` | `/api/leads`                          | Submit a contact or quote inquiry              |

## Project structure

```
src/
├── app/              # App Router pages and API routes
├── components/       # Feature and UI components (many have v2 variants)
├── hooks/            # Shared React hooks
└── lib/              # Database, types, mappers, static content, utilities

scripts/
├── migrate-products.ts   # Seed Postgres from src/lib/data.ts
└── gen-sql.ts            # Generate SQL from bundled product data

schema.sql            # Postgres schema for Supabase
```

## Data model

- **`products`**: listing fields used on catalogue and card views
- **`product_details`**: detail-page fields (1:1 with `products`)
- **`leads`**: contact and quote submissions, optionally linked to a product

Landing page copy lives in `src/lib/content.ts`. Product runtime data is read
from Postgres; `src/lib/data.ts` is the bundled seed dataset used by the
migration script.

## Deployment

1. Set `DATABASE_URL` in your hosting environment.
2. Run `schema.sql` against the production database if tables do not exist.
3. Run `npm run db:migrate` when seed data changes.
4. Build and start with `npm run build && npm run start`.
