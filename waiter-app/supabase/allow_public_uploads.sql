-- Enable Storage if not already enabled (usually enabled by default)

-- 1. Create the bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('menu-images', 'menu-images', true)
on conflict (id) do nothing;

-- 2. Drop existing policies to avoid conflicts or restrictions
drop policy if exists "Menu images are publicly accessible" on storage.objects;
drop policy if exists "Authenticated users can upload menu images" on storage.objects;
drop policy if exists "Authenticated users can update menu images" on storage.objects;
drop policy if exists "Authenticated users can delete menu images" on storage.objects;
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Public Insert" on storage.objects;
drop policy if exists "Public Update" on storage.objects;

-- 3. Create permissive policies for our simplified app
-- (Allows anyone to read, upload, and update images in this bucket)

-- Read access
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'menu-images' );

-- Insert access (allows uploads without authentication)
create policy "Public Insert"
on storage.objects for insert
with check ( bucket_id = 'menu-images' );

-- Update access (allows overwriting without authentication)
create policy "Public Update"
on storage.objects for update
using ( bucket_id = 'menu-images' );

