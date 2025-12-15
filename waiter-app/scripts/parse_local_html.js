
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

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
const HTML_FILE_PATH = path.join(__dirname, '../tanuki.html');

async function run() {
  if (!fs.existsSync(HTML_FILE_PATH)) {
    console.error('File not found');
    return;
  }

  const html = fs.readFileSync(HTML_FILE_PATH, 'utf8');
  console.log(`Scanning HTML (${html.length} chars)...`);

  let items = [];

  // Robust Regex: Find full <img> tags, then extract attributes
  const imgTagRegex = /<img\s+([^>]+)>/gi;
  let tagMatch;
  
  while ((tagMatch = imgTagRegex.exec(html)) !== null) {
      const attrs = tagMatch[1];
      
      // Extract src
      const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
      // Extract alt
      const altMatch = attrs.match(/alt=["']([^"']+)["']/i);

      if (srcMatch && altMatch) {
          let src = srcMatch[1];
          let alt = altMatch[1].trim();

          // Fix relative URLs
          if (src.startsWith('/')) src = 'https://tanukifamily.ru' + src;
          
          // Fix saved page local paths (e.g. ./Page_files/image.jpg)
          if (src.includes('_files/')) {
              const parts = src.split('/');
              const filename = parts[parts.length - 1];
              src = `https://kcdn.tanuki.ru/images/1/${filename}`;
          }
          
          // Filter bad images
          if (
              alt.length > 2 && 
              !alt.toLowerCase().includes('logo') && 
              !src.includes('.svg') &&
              !src.includes('data:image') // Skip base64 placeholders
          ) {
              items.push({ title: alt, url: src });
          }
      }
  }

  const uniqueItems = Array.from(new Map(items.map(item => [item.title, item])).values());
  console.log(`Found ${uniqueItems.length} unique items.`);

  // Debug Tiger
  const tiger = uniqueItems.find(i => i.title.includes('Тайгер'));
  if (tiger) console.log('DEBUG: Found Tiger URL:', tiger.url);
  else console.log('DEBUG: Tiger NOT found in HTML scan.');

  // Update DB
  let updatedCount = 0;
  const { data: dbItems } = await supabase.from('menu_items').select('title');

  if (!dbItems) {
      console.error('Failed to fetch DB items');
      return;
  }

  for (const item of uniqueItems) {
       // Fuzzy match against DB
       const match = dbItems.find(dbItem => 
           dbItem.title.toLowerCase() === item.title.toLowerCase() ||
           dbItem.title.toLowerCase().includes(item.title.toLowerCase()) ||
           item.title.toLowerCase().includes(dbItem.title.toLowerCase())
       );
       
       if (match) {
           const { error } = await supabase
              .from('menu_items')
              .update({ image_url: item.url })
              .eq('title', match.title);
              
           if (!error) updatedCount++;
       }
  }

  console.log(`Updated ${updatedCount} items.`);
}

run();
