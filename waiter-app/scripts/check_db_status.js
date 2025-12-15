
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load env
function loadEnv() {
  try {
    const envPath = path.resolve(__dirname, '../.env.local');
    if (fs.existsSync(envPath)) {
      const envFile = fs.readFileSync(envPath, 'utf8');
      const env = {};
      envFile.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
          env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
        }
      });
      return env;
    }
  } catch (e) {}
  return process.env;
}

const env = loadEnv();
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkStatus() {
  // Get all items
  const { data: items, error } = await supabase
    .from('menu_items')
    .select('id, title, image_url');

  if (error) {
    console.error('Error fetching items:', error);
    return;
  }

  const total = items.length;
  const withImage = items.filter(i => i.image_url && i.image_url.length > 5).length;
  const withoutImage = total - withImage;

  console.log(`Total items in DB: ${total}`);
  console.log(`With images: ${withImage}`);
  console.log(`Without images: ${withoutImage}`);

  if (withoutImage > 0) {
      console.log('\nSample items without images:');
      items.filter(i => !i.image_url || i.image_url.length <= 5)
           .slice(0, 10)
           .forEach(i => console.log(`- ${i.title}`));
  }
}

checkStatus();

