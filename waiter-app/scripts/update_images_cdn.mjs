
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// Need service role key for updates if RLS is on, but maybe anon works if policy allows
// Or use service role if available. Assuming anon for now or user will provide.
// Actually, usually we need SERVICE_ROLE_KEY for admin updates bypassing RLS.
// I'll try with ANON, if it fails, I'll ask user.

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const mapping = [
  { title: "Джингл сет", url: "https://kcdn.tanuki.ru/images/1/lnXv9gFNmHUGkmGuVrk6EOYqom8y-CJv.png" },
  { title: "Маме с любовью", url: "https://kcdn.tanuki.ru/images/1/QHARZMymHi0f0frkydeddoMAoCvFyDKz.jpg" },
  { title: "Кавай сет", url: "https://kcdn.tanuki.ru/images/1/I98-Pw2CbPoA1vd7mb-6iAcylUe8IHaz.png" },
  { title: "Мураками сет", url: "https://kcdn.tanuki.ru/images/1/Z-IKKt-poKbuBx0sfhNJV_5jFY9aEiOC.png" },
  { title: "Фудзи сет", url: "https://kcdn.tanuki.ru/images/1/6nlPZeO8naTAEFjL8s5L4624Yt9u0Sh-.png" },
  { title: "Онсен сет", url: "https://kcdn.tanuki.ru/images/1/n09kKbG0g1qnmdsssqFz4ewf8KGfSUVC.png" },
  { title: "Сумико сет", url: "https://kcdn.tanuki.ru/images/1/-JNsG0BGhfrBQU5EWQ5WVubZDYKzrnyU.png" },
  { title: "Аригато сет", url: "https://kcdn.tanuki.ru/images/1/Og2ipQbWkxdQK9UtiNktbbKcaCR0A4tC.png" },
  { title: "Ойши сет", url: "https://kcdn.tanuki.ru/images/1/Nh20fiFRGFAxLljY5JCsbuvk2UBmOzvk.png" },
  { title: "Тануки сет", url: "https://kcdn.tanuki.ru/images/1/d9i5mSsqYxIBZYq0x1A290b4PYu19XKq.png" },
  { title: "Party De Luxe", url: "https://kcdn.tanuki.ru/images/1/05ygkY0WibqtJcSu_CgotckjJUpMz9Al.png" },
  { title: "Дим-самы с сочными овощами", url: "https://kcdn.tanuki.ru/images/1/CexZm9QOM8HrmhTenVd9U0T_I2MFWoCP.png" },
  { title: "Дим-самы с лососем и креветкой", url: "https://kcdn.tanuki.ru/images/1/hVfeUBR3lwje696WJ7z1P3tsuqYpRWAS.png" },
  { title: "Дим-самы с кальмаром и креветкой", url: "https://kcdn.tanuki.ru/images/1/ego8F6LDAl9okApSE0gpDK267pbstlK1.png" },
  { title: "Дим-самы с крабом и креветкой", url: "https://kcdn.tanuki.ru/images/1/qrHTVTqLdV5fN4tj2EwgtYMxxY6ferGS.png" },
  { title: "Сифудо сет", url: "https://kcdn.tanuki.ru/images/1/SaUYn6z8ICLRTlNhXbkLTlYMc6Oyw--a.png" },
  // ... можно добавить больше, если есть уверенность
];

async function updateImages() {
  console.log('Starting image updates...');
  
  for (const item of mapping) {
    const { error } = await supabase
      .from('menu_items')
      .update({ image_url: item.url })
      .eq('title', item.title);

    if (error) {
      console.error(`Error updating ${item.title}:`, error.message);
    } else {
      console.log(`Updated: ${item.title}`);
    }
  }
  
  console.log('Done.');
}

updateImages();


