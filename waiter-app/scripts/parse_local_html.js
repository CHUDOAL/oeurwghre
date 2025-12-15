
const fs = require('fs');
const path = require('path');

const WORK_DIR = path.join(__dirname, '../');
const SQL_OUTPUT_PATH = path.join(__dirname, '../supabase/update_images_strict.sql');

async function run() {
  const files = fs.readdirSync(WORK_DIR).filter(file => file.endsWith('.html'));
  
  let allItems = [];

  for (const file of files) {
      const filePath = path.join(WORK_DIR, file);
      const html = fs.readFileSync(filePath, 'utf8');
      
      const imgTagRegex = /<img\s+([^>]+)>/gi;
      let tagMatch;
      
      while ((tagMatch = imgTagRegex.exec(html)) !== null) {
          const attrs = tagMatch[1];
          const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
          const altMatch = attrs.match(/alt=["']([^"']+)["']/i);

          if (srcMatch && altMatch) {
              let src = srcMatch[1];
              let alt = altMatch[1].trim();

              if (src.startsWith('/')) src = 'https://tanukifamily.ru' + src;
              if (src.includes('_files/')) {
                  const parts = src.split('/');
                  const filename = parts[parts.length - 1];
                  src = `https://kcdn.tanuki.ru/images/1/${filename}`;
              }
              src = src.split('?')[0];

              // Filter out logos and irrelevant images
              if (
                  alt.length > 2 && 
                  !src.includes('.svg') &&
                  !src.includes('data:image') &&
                  !['ТАНУКИ', 'КАСПИЙКА', 'Ёрш', 'Кейтеринг', 'Острое', 'Хиты', 'Новинки'].includes(alt) &&
                  !alt.includes('задний фон') &&
                  !alt.includes('эмоджи')
              ) {
                  allItems.push({ title: alt, url: src });
              }
          }
      }
  }

  const uniqueItems = Array.from(new Map(allItems.map(item => [item.title, item])).values());
  console.log(`Unique items: ${uniqueItems.length}`);

  let sqlContent = '';
  
  for (const item of uniqueItems) {
      const safeTitle = item.title.replace(/'/g, "''");
      const safeUrl = item.url;
      
      // STRICT EQUALITY to avoid "Tanuki" matching "Roll Tanuki" incorrectly
      // We assume the DB title matches the Site title exactly (or close enough that we should fix DB manually if not)
      sqlContent += `UPDATE public.menu_items SET image_url = '${safeUrl}' WHERE title = '${safeTitle}';\n`;
  }

  fs.writeFileSync(SQL_OUTPUT_PATH, sqlContent);
  console.log(`Generated strict SQL at: ${SQL_OUTPUT_PATH}`);
}

run();
