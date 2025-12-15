const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../menu_data.json');
const outputPath = path.join(__dirname, '../supabase/seed.sql');

const items = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let sql = `-- Seed data for menu_items\n`;
sql += `INSERT INTO public.menu_items (title, description, price, category, image_url) VALUES\n`;

const values = items.map(item => {
  const title = item.title.replace(/'/g, "''"); // Escape single quotes
  const desc = (item.description || '').replace(/'/g, "''");
  const cat = (item.category || 'Other').replace(/'/g, "''");
  const img = (item.image_url || '').replace(/'/g, "''");
  return `('${title}', '${desc}', ${item.price}, '${cat}', '${img}')`;
});

sql += values.join(',\n') + `\nON CONFLICT DO NOTHING;`;

fs.writeFileSync(outputPath, sql);
console.log(`Generated ${outputPath} with ${items.length} items.`);


