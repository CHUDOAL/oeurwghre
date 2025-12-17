
-- Разрешить обновление меню для всех (или только для авторизованных, но для скрипта проще для всех временно)
create policy "Enable update for all users" on "public"."menu_items"
as permissive
for update
to public
using (true)
with check (true);

-- Или, если политика уже есть, но она строгая, можно отключить RLS временно
-- alter table "public"."menu_items" disable row level security;


