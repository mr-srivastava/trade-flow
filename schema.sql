-- TradeFlow database schema (Supabase Postgres).
-- Run once in the Supabase SQL editor, or:
--   psql "$DATABASE_URL" -f schema.sql
--
-- Order matters: products must exist before product_details and leads
-- (both reference products.id via foreign keys).

-- 1. Catalogue / listing fields (used by /products and ProductCard)
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
  -- structured / repeating sections kept as jsonb (arrays of {key,value} etc.)
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

-- 3. Leads / inquiries (contact + quote)
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
