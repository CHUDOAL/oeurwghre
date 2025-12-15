/* Modify Orders Table to add username */
alter table public.orders add column if not exists username text;

/* Update policies to allow public access (since we handle auth client-side simply) */
drop policy if exists "Orders are viewable by authenticated users" on public.orders;
create policy "Orders are viewable by everyone" on public.orders for select using (true);
create policy "Orders are editable by everyone" on public.orders for all using (true);

drop policy if exists "Order items are viewable by authenticated users" on public.order_items;
create policy "Order items are viewable by everyone" on public.order_items for select using (true);
create policy "Order items are editable by everyone" on public.order_items for all using (true);


