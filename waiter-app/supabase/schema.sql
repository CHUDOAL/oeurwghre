-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Menu Items Table
create table public.menu_items (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  image_url text,
  price numeric,
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Orders Table
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  table_number text not null,
  status text default 'active' check (status in ('active', 'completed', 'cancelled')),
  user_id uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Order Items Table (Linking Orders and Menu Items)
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  menu_item_id uuid references public.menu_items(id) not null,
  served boolean default false,
  quantity integer default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.menu_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Policies (Simple for now: Authenticated users can do everything)
-- Menu Items: Read public, Write authenticated (or just authenticated)
create policy "Menu items are viewable by everyone" on public.menu_items
  for select using (true);

create policy "Menu items are editable by authenticated users" on public.menu_items
  for all using (auth.role() = 'authenticated');

-- Orders: Authenticated users can view and edit
create policy "Orders are viewable by authenticated users" on public.orders
  for all using (auth.role() = 'authenticated');

-- Order Items: Authenticated users can view and edit
create policy "Order items are viewable by authenticated users" on public.order_items
  for all using (auth.role() = 'authenticated');

-- Storage Bucket for Menu Images
-- insert into storage.buckets (id, name, public) values ('menu-images', 'menu-images', true);
-- create policy "Menu images are publicly accessible" on storage.objects for select using (bucket_id = 'menu-images');
-- create policy "Authenticated users can upload menu images" on storage.objects for insert using (bucket_id = 'menu-images' and auth.role() = 'authenticated');



