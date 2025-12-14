const fs = require('fs');
const path = require('path');

const getCategoryType = (item) => {
  const title = item.title.toLowerCase();
  const category = (item.category || '').toLowerCase();

  // 1. Drinks
  if (
    category === 'напитки' || 
    title.includes('мл') || 
    title.includes('чай') || 
    title.includes('кофе') || 
    title.includes('сок') || 
    title.includes('лимонад') || 
    title.includes('фреш') || 
    title.includes('морс') || 
    title.includes('пиво') || 
    title.includes('stella') || 
    title.includes('evervess') || 
    title.includes('липтон') ||
    title.includes('вода') ||
    title.includes('кола') ||
    title.includes('глинтвейн')
  ) {
    return 'drinks';
  }

  // 2. Rolls
  if (category === 'роллы' || title.includes('ролл') || title.includes('маки')) {
    // Hot Rolls
    if (
      title.includes('хот') || 
      title.includes('темпура') || 
      title.includes('запечен') || 
      title.includes('теплый') || 
      title.includes('гриль') ||
      title.includes('жарен')
    ) {
      return 'rolls_hot';
    }
    // Default to Cold Rolls
    return 'rolls_cold';
  }

  // 3. Hot Dishes
  if (
    category === 'супы' || 
    category === 'горячее' ||
    title.includes('суп') || 
    title.includes('рамен') || 
    title.includes('лапша') || 
    title.includes('рис') || 
    title.includes('курица') || 
    title.includes('свинина') || 
    title.includes('говядина') || 
    title.includes('бургер') || 
    title.includes('дим-сам') || 
    title.includes('гедза') || 
    title.includes('креветки темпура') ||
    title.includes('шашлычок') ||
    title.includes('якитори') ||
    title.includes('стейк') ||
    title.includes('ребра') ||
    title.includes('тяхан') ||
    title.includes('вонтоны') ||
    title.includes('горячий')
  ) {
    return 'hot';
  }

  // 4. Cold Dishes (Salads, Sushi, Sashimi, Desserts, Snacks)
  if (
    category === 'суши' || 
    category === 'салаты' || 
    category === 'закуски' || 
    category === 'десерты' ||
    title.includes('суши') || 
    title.includes('сашими') || 
    title.includes('салат') || 
    title.includes('чука') || 
    title.includes('поке') || 
    title.includes('тартар') || 
    title.includes('карпаччо') || 
    title.includes('тирамису') || 
    title.includes('чизкейк') || 
    title.includes('мороженое') ||
    title.includes('мидии') || 
    title.includes('запечен')
  ) {
    return 'cold';
  }

  if (title.includes('мидии')) return 'hot'; 
  if (title.includes('картофель') || title.includes('фри')) return 'hot';

  return 'cold';
};

const generateMigrationSQL = () => {
  const jsonPath = path.join(__dirname, '../menu_data.json');
  const items = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  let sql = `
-- Add station column if not exists
alter table public.menu_items add column if not exists station text;
alter table public.order_items add column if not exists item_station text;

-- Update existing items
`;

  items.forEach(item => {
    const station = getCategoryType(item);
    const title = item.title.replace(/'/g, "''");
    
    sql += `UPDATE public.menu_items SET station = '${station}' WHERE title = '${title}';\n`;
  });

  const outputPath = path.join(__dirname, '../supabase/migration_stations.sql');
  fs.writeFileSync(outputPath, sql);
  console.log(`Generated migration SQL at ${outputPath}`);
};

generateMigrationSQL();
