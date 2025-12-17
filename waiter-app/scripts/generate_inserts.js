
const fs = require('fs');
const path = require('path');

const WORK_DIR = path.join(__dirname, '../');
const SQL_OUTPUT_PATH = path.join(__dirname, '../supabase/insert_missing_items.sql');

async function run() {
  const files = fs.readdirSync(WORK_DIR).filter(file => file.endsWith('.html'));
  
  if (files.length === 0) {
      console.log('No .html files found.');
      return;
  }

  let allItems = [];

  for (const file of files) {
      const filePath = path.join(WORK_DIR, file);
      const html = fs.readFileSync(filePath, 'utf8');
      console.log(`Processing ${file}...`);

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
              // Clean up query params like ?width=650
              src = src.split('?')[0];

              if (
                  alt.length > 2 && 
                  !alt.toLowerCase().includes('logo') && 
                  !src.includes('.svg') &&
                  !src.includes('data:image')
              ) {
                  // Determine category
                  let category = 'Основное';
                  const lowerTitle = alt.toLowerCase();
                  
                  if (lowerTitle.includes('ролл')) category = 'Роллы';
                  else if (lowerTitle.includes('суши') || lowerTitle.includes('гунка')) category = 'Суши';
                  else if (lowerTitle.includes('сет')) category = 'Сеты';
                  else if (lowerTitle.includes('суп') || lowerTitle.includes('мисо') || lowerTitle.includes('рамен') || lowerTitle.includes('том ям')) category = 'Супы';
                  else if (lowerTitle.includes('пицца')) category = 'Пицца';
                  else if (lowerTitle.includes('салат') || lowerTitle.includes('цезарь')) category = 'Салаты';
                  else if (lowerTitle.includes('сок') || lowerTitle.includes('кола') || lowerTitle.includes('вода') || lowerTitle.includes('чай') || lowerTitle.includes('лимонад')) category = 'Напитки';
                  
                  // Station (for kitchen)
                  let station = 'cold'; // Default
                  if (category === 'Супы' || category === 'Пицца' || lowerTitle.includes('горяч') || lowerTitle.includes('жарен')) station = 'hot';
                  if (category === 'Напитки') station = 'drinks';

                  allItems.push({ title: alt, url: src, category, station });
              }
          }
      }
  }

  const uniqueItems = Array.from(new Map(allItems.map(item => [item.title, item])).values());
  console.log(`Total unique items: ${uniqueItems.length}`);

  let sqlContent = `
-- Insert missing items
-- Note: Price is set to 0, please update manually
  `;
  
  for (const item of uniqueItems) {
      const safeTitle = item.title.replace(/'/g, "''");
      const safeUrl = item.url;
      const safeCategory = item.category;
      const safeStation = item.station;
      
      // INSERT if not exists based on title
      sqlContent += `
INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT '${safeTitle}', '${safeUrl}', '${safeCategory}', '${safeStation}', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = '${safeTitle}');
`;
  }

  fs.writeFileSync(SQL_OUTPUT_PATH, sqlContent);
  console.log(`Generated SQL at: ${SQL_OUTPUT_PATH}`);
}

run();


