-- Create a bucket for menu images
insert into storage.buckets (id, name, public) 
values ('menu-images', 'menu-images', true)
on conflict (id) do nothing;

-- Policy to allow public viewing of images
create policy "Menu images are publicly accessible" 
on storage.objects for select 
using (bucket_id = 'menu-images');

-- Policy to allow authenticated users to upload images
create policy "Authenticated users can upload menu images" 
on storage.objects for insert 
using (bucket_id = 'menu-images' and auth.role() = 'authenticated');

-- Policy to allow authenticated users to update images
create policy "Authenticated users can update menu images" 
on storage.objects for update 
using (bucket_id = 'menu-images' and auth.role() = 'authenticated');

-- Policy to allow authenticated users to delete images
create policy "Authenticated users can delete menu images" 
on storage.objects for delete 
using (bucket_id = 'menu-images' and auth.role() = 'authenticated');

