
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const WORK_DIR = path.join(__dirname, '../');
const HTML_SOURCE = path.join(__dirname, '../TAnyki2.html');
const SQL_OUTPUT_PATH = path.join(__dirname, '../supabase/update_descriptions_full.sql');

async function run() {
  console.log('Reading source HTML...');
  if (!fs.existsSync(HTML_SOURCE)) {
      console.error(`File not found: ${HTML_SOURCE}`);
      return;
  }

  const html = fs.readFileSync(HTML_SOURCE, 'utf8');
  const linkRegex = /href=["']((?:https:\/\/tanukifamily\.ru)?\/tanuki\/product\/[^"']+)["']/g;
  let matches;
  let links = new Set();
  
  while ((matches = linkRegex.exec(html)) !== null) {
      let link = matches[1];
      if (link.startsWith('/')) {
          link = 'https://tanukifamily.ru' + link;
      }
      links.add(link);
  }

  const productLinks = Array.from(links);
  console.log(`Found ${productLinks.length} product links in local file.`);

  if (productLinks.length === 0) return;

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  let sqlContent = '';
  let count = 0;

  for (const link of productLinks) {
      count++;
      console.log(`[${count}/${productLinks.length}] Processing: ${link}`);
      
      try {
          await page.goto(link, { waitUntil: 'networkidle2' });
          
          const data = await page.evaluate(() => {
              const h1 = document.querySelector('h1');
              if (!h1) return null;

              const title = h1.innerText.trim();
              let description = '';

              // Strategy 4: Based on screenshot (H1 sibling -> div -> div -> p)
              const sibling = h1.nextElementSibling;
              
              if (sibling) {
                  // Look for P inside the sibling container
                  const p = sibling.querySelector('p');
                  if (p) {
                      description = p.innerText.trim();
                  } 
                  // If p is not found, maybe just text content of the div?
                  else if (sibling.innerText && sibling.innerText.length > 5) {
                      // Filter out nutritional info if it got mixed in
                      description = sibling.innerText.split('Пищевая ценность')[0].trim();
                  }
              }

              // Fallback: Just find the first <p> that contains commas (ingredients usually have commas) 
              // and is near the top of the content
              if (!description) {
                   const allPs = Array.from(document.querySelectorAll('p'));
                   for (const p of allPs) {
                       const text = p.innerText;
                       if (text.length > 20 && text.includes(',') && !text.includes('©')) {
                           // Check if it's visible
                           description = text;
                           break;
                       }
                   }
              }

              return { title, description };
          });

          if (data && data.title && data.description) {
              const safeTitle = data.title.replace(/'/g, "''");
              let safeDesc = data.description.replace(/<[^>]*>/g, '').replace(/'/g, "''").trim();
              if (safeDesc.length > 800) safeDesc = safeDesc.substring(0, 797) + '...';
              
              console.log(`  -> Found: ${data.description.substring(0, 40)}...`);
              sqlContent += `UPDATE public.menu_items SET description = '${safeDesc}' WHERE title = '${safeTitle}';\n`;
          } else {
              console.log('  -> Description NOT found');
          }
          
          await new Promise(r => setTimeout(r, 1000));

      } catch (err) {
          console.error(`  -> Error: ${err.message}`);
      }
      
      if (count % 5 === 0) {
          fs.writeFileSync(SQL_OUTPUT_PATH, sqlContent);
          console.log('  (Saved progress)');
      }
  }

  fs.writeFileSync(SQL_OUTPUT_PATH, sqlContent);
  console.log('Done!');
  
  await browser.close();
}

run();
