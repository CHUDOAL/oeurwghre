const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');

const TARGET_URL = 'https://tanukifamily.ru/tanuki/msk/';

async function fetchMenu() {
  try {
    console.log('Fetching page...');
    const { data } = await axios.get(TARGET_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      }
    });

    console.log('Page fetched, parsing...');
    const $ = cheerio.load(data);
    const items = [];

    // Inspect the HTML structure based on common class names or standard tags
    // Since I can't inspect element, I'll try to dump the HTML structure of a product card
    // But let's try to guess first.
    
    // Attempt 1: Look for common product card classes
    // Often: .product-item, .card, .catalog-item
    // Images: img inside these cards
    // Descriptions: .desc, .description, or p tags
    
    // Let's grab all images and see if we can match them to titles
    $('img').each((i, el) => {
       const src = $(el).attr('src');
       const alt = $(el).attr('alt');
       if (src && alt && src.includes('http')) {
         // This might be a product image
         // items.push({ title: alt, image_url: src });
       }
    });

    // Better strategy: Dump a part of HTML to analyze class names
    // I will save the HTML to a file so I can inspect it with `read_file`
    fs.writeFileSync('page_source.html', data);
    console.log('HTML saved to page_source.html');

  } catch (error) {
    console.error('Error fetching page:', error.message);
    if (error.response) {
      console.log('Status:', error.response.status);
    }
  }
}

fetchMenu();

