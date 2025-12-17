import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.log('No .env.local file found. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials missing.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// URL to scrape (Replace this with the specific Tanuki menu page)
const MENU_URL = 'https://tanukifamily.ru/tanuki/msk/menu/'; 

async function scrapeMenu() {
  console.log(`Fetching menu from ${MENU_URL}...`);
  
  try {
    const response = await fetch(MENU_URL);
    const html = await response.text();
    const $ = cheerio.load(html);

    const items = [];

    // SELECTORS - These depend on the actual website structure.
    // Example based on common patterns. UPDATE THESE after inspecting the site.
    
    // Example: Iterate over product cards
    // This is a GUESS. You need to inspect the Tanuki website HTML.
    $('.product-card').each((_, element) => {
      const title = $(element).find('.product-card__title').text().trim();
      const description = $(element).find('.product-card__description').text().trim();
      const priceText = $(element).find('.product-card__price').text().trim();
      const price = parseFloat(priceText.replace(/[^\d.]/g, '')) || 0;
      const imageUrl = $(element).find('img').attr('src');
      
      // Determine category (maybe from a parent section or tag)
      const category = 'Main'; 

      if (title) {
        items.push({
          title,
          description,
          price,
          image_url: imageUrl,
          category,
        });
      }
    });

    console.log(`Found ${items.length} items.`);

    if (items.length > 0) {
      // Insert into Supabase
      const { error } = await supabase
        .from('menu_items')
        .upsert(items, { onConflict: 'title' }); // Assuming title is unique for upsert

      if (error) {
        console.error('Error inserting items:', error);
      } else {
        console.log('Successfully updated menu in Supabase!');
      }
    } else {
      console.log('No items found. Check the CSS selectors in scripts/scrape_menu.mjs');
    }

  } catch (error) {
    console.error('Scraping failed:', error);
  }
}

scrapeMenu();



