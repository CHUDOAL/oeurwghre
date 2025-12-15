
const fs = require('fs');
const path = require('path');

const WORK_DIR = path.join(__dirname, '../');
const SQL_OUTPUT_PATH = path.join(__dirname, '../supabase/update_descriptions_bulk.sql');

async function run() {
  const files = fs.readdirSync(WORK_DIR).filter(file => file.endsWith('.html') && file !== 'tanuki.html' && file !== 'TAnyki2.html');
  console.log(`Found ${files.length} product files.`);
  
  let updates = [];

  for (const file of files) {
      const filePath = path.join(WORK_DIR, file);
      const html = fs.readFileSync(filePath, 'utf8');
      
      let title = '';
      let description = '';

      // 1. Get Title from Filename (most reliable as filenames are standardized)
      // "Ролл Санта заказать..." -> "Ролл Санта"
      title = file.split(' заказать')[0];

      // 2. Try JSON-LD (Best for Description)
      const jsonRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gs;
      let jsonMatch;
      while ((jsonMatch = jsonRegex.exec(html)) !== null) {
          try {
              const data = JSON.parse(jsonMatch[1]);
              const items = Array.isArray(data) ? data : [data];
              items.forEach(item => {
                  if ((item['@type'] === 'Product' || item['@type'] === 'MenuItem') && item.description) {
                      description = item.description;
                  }
              });
          } catch (e) {}
      }

      // 3. Try Meta Description (Backup)
      if (!description) {
          const metaMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
          if (metaMatch) {
              let meta = metaMatch[1];
              if (meta.includes('Состав:')) {
                  description = meta.split('Состав:')[1].trim();
              }
          }
      }

      if (title && description) {
          updates.push({ title, description });
      }
  }
  
  const uniqueUpdates = Array.from(new Map(updates.map(item => [item.title, item])).values());
  console.log(`Extracted descriptions for ${uniqueUpdates.length} items.`);
  
  let sqlContent = '';
  for (const item of uniqueUpdates) {
      const safeTitle = item.title.replace(/'/g, "''");
      let safeDesc = item.description
          .replace(/<[^>]*>/g, '') // No HTML
          .replace(/'/g, "''")     // Escape quotes
          .trim();

      // Clean up punctuation
      if (safeDesc.endsWith('.')) safeDesc = safeDesc.slice(0, -1);
      
      if (safeDesc.length > 3) {
          sqlContent += `UPDATE public.menu_items SET description = '${safeDesc}' WHERE title = '${safeTitle}';\n`;
      }
  }
  
  fs.writeFileSync(SQL_OUTPUT_PATH, sqlContent);
  console.log(`Generated SQL at: ${SQL_OUTPUT_PATH}`);
}

run();
