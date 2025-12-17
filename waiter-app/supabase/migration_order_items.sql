/* Add title and price directly to order_items to avoid join issues with custom items */
alter table public.order_items add column if not exists item_title text;
alter table public.order_items add column if not exists item_price numeric;

/* Allow menu_item_id to be nullable for pure custom items (optional, but safer) */
alter table public.order_items alter column menu_item_id drop not null;



