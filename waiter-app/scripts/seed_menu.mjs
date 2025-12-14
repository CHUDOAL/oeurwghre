import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables from .env.local
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.log('No .env.local file found.');
  process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials missing.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedMenu() {
  const jsonPath = path.join(__dirname, '../menu_data.json');
  if (!fs.existsSync(jsonPath)) {
    console.error('menu_data.json not found.');
    return;
  }

  const items = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  console.log(`Loaded ${items.length} items from JSON.`);

  // Fetch existing items to avoid duplicates
  const { data: existingItems, error: fetchError } = await supabase
    .from('menu_items')
    .select('title');

  if (fetchError) {
    console.error('Error fetching existing items:', fetchError);
    return;
  }

  const existingTitles = new Set(existingItems.map(i => i.title));
  const newItems = items.filter(i => !existingTitles.has(i.title));

  if (newItems.length === 0) {
    console.log('All items already exist in database.');
    return;
  }

  console.log(`Seeding ${newItems.length} new items...`);

  // Split into chunks
  const chunkSize = 50;
  for (let i = 0; i < newItems.length; i += chunkSize) {
    const chunk = newItems.slice(i, i + chunkSize);
    const { error } = await supabase
      .from('menu_items')
      .insert(chunk);

    if (error) {
      console.error('Error inserting chunk:', error);
    } else {
      console.log(`Inserted items ${i + 1} to ${Math.min(i + chunkSize, newItems.length)}`);
    }
  }

  console.log('Done!');
}

seedMenu();
