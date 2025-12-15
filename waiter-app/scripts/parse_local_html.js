
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Загружаем переменные окружения
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
  } catch (e) {
    console.error('Error reading .env.local', e);
  }
  return process.env;
}

const env = loadEnv();
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Путь к файлу
const HTML_FILE_PATH = path.join(__dirname, '../tanuki.html');

async function run() {
  if (!fs.existsSync(HTML_FILE_PATH)) {
    console.error(`File not found: ${HTML_FILE_PATH}`);
    return;
  }

  const html = fs.readFileSync(HTML_FILE_PATH, 'utf8');
  console.log(`Read file, size: ${html.length} chars.`);

  let items = [];

  // Strategy 2: Regex for <img> tags with alt (fallback)
  console.log('Scanning for images...');
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']+)["']/g;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
      let src = match[1];
      let alt = match[2];
      alt = alt.trim();
      if (src.startsWith('/')) src = 'https://tanukifamily.ru' + src;
      if (alt.length > 3 && !alt.toLowerCase().includes('logo') && !src.includes('.svg')) {
          items.push({ title: alt, url: src });
      }
  }
  
  const imgRegex2 = /<img[^>]+alt=["']([^"']+)["'][^>]*src=["']([^"']+)["']/g;
  while ((match = imgRegex2.exec(html)) !== null) {
      let alt = match[1];
      let src = match[2];
      if (src.startsWith('/')) src = 'https://tanukifamily.ru' + src;
      if (alt.length > 3 && !alt.toLowerCase().includes('logo') && !src.includes('.svg')) {
           items.push({ title: alt, url: src });
      }
  }

  const uniqueItems = Array.from(new Map(items.map(item => [item.title, item])).values());
  console.log(`Found ${uniqueItems.length} unique items in HTML.`);
  
  // Show first 5 found items
  console.log('Sample items found in HTML:', uniqueItems.slice(0, 5).map(i => i.title));

  // Get current DB items to compare
  const { data: dbItems, error } = await supabase.from('menu_items').select('title');
  if (error) {
      console.error('Error fetching DB items:', error);
      return;
  }
  
  console.log(`Total items in DB: ${dbItems.length}`);
  console.log('Sample items in DB:', dbItems.slice(0, 5).map(i => i.title));

  // Update DB with fuzzy matching or exact match
  let updatedCount = 0;
  for (const item of uniqueItems) {
    // Try exact match
    let { data, error } = await supabase
      .from('menu_items')
      .update({ image_url: item.url })
      .eq('title', item.title)
      .select();

    if (data && data.length > 0) {
       console.log(`[EXACT] Updated: ${item.title}`);
       updatedCount++;
    } else {
       // Try matching "Ролл Калифорния" in DB vs "Калифорния" in HTML
       // or "Ролл Калифорния" in HTML vs "Калифорния" in DB
       // Simple fuzzy: check if one contains the other
       
       // Find a DB item that contains the HTML title OR is contained by HTML title
       const match = dbItems.find(dbItem => 
           dbItem.title.toLowerCase() === item.title.toLowerCase() ||
           dbItem.title.toLowerCase().includes(item.title.toLowerCase()) ||
           item.title.toLowerCase().includes(dbItem.title.toLowerCase())
       );
       
       if (match) {
           const { error: updateError } = await supabase
              .from('menu_items')
              .update({ image_url: item.url })
              .eq('title', match.title);
              
           if (!updateError) {
               console.log(`[FUZZY] Updated: ${match.title} (matched with ${item.title})`);
               updatedCount++;
           }
       }
    }
  }

  console.log(`Finished. Updated ${updatedCount} items.`);
}

run();
