
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Загрузка env (упрощенная)
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

async function check() {
  const { data, error } = await supabase
    .from('menu_items')
    .select('title, image_url')
    .eq('title', 'Ролл Тайгер');

  console.log('Result for "Ролл Тайгер":', data);
  
  if (data && data.length > 0 && data[0].image_url) {
      console.log('URL exists:', data[0].image_url);
  } else {
      console.log('URL is missing or item not found.');
  }
}

check();

