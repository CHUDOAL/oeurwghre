
const fs = require('fs');
const path = require('path');

const WORK_DIR = path.join(__dirname, '../');

async function listItems() {
  const files = fs.readdirSync(WORK_DIR).filter(file => file.endsWith('.html'));
  
  if (files.length === 0) {
      console.log('No HTML files found.');
      return;
  }

  let allTitles = [];

  for (const file of files) {
      const html = fs.readFileSync(path.join(WORK_DIR, file), 'utf8');
      const imgTagRegex = /<img\s+([^>]+)>/gi;
      let tagMatch;
      
      while ((tagMatch = imgTagRegex.exec(html)) !== null) {
          const attrs = tagMatch[1];
          const altMatch = attrs.match(/alt=["']([^"']+)["']/i);
          const srcMatch = attrs.match(/src=["']([^"']+)["']/i);

          if (altMatch && srcMatch) {
              const alt = altMatch[1].trim();
              const src = srcMatch[1];
              // Filter garbage
              if (alt.length > 2 && !alt.toLowerCase().includes('logo') && !src.includes('.svg')) {
                  allTitles.push(alt);
              }
          }
      }
  }

  const uniqueTitles = [...new Set(allTitles)].sort();
  console.log('--- FOUND ITEMS ---');
  uniqueTitles.forEach(t => console.log(t));
  console.log(`\nTotal: ${uniqueTitles.length}`);
}

listItems();

