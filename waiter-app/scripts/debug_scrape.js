
const puppeteer = require('puppeteer');
const path = require('path');

const TARGET_URL = 'https://tanukifamily.ru/tanuki/product/dzingl-set/';
const SCREENSHOT_PATH = path.join(__dirname, 'debug_screenshot.png');

async function run() {
  console.log(`Inspecting ${TARGET_URL}...`);
  const browser = await puppeteer.launch({ 
      headless: "new",
      // Add arguments to mimic real browser better
      args: [
          '--no-sandbox', 
          '--disable-setuid-sandbox',
          '--window-size=1920,1080',
          '--disable-blink-features=AutomationControlled' 
      ]
  });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  
  // Mask navigator.webdriver
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
  });

  try {
      await page.goto(TARGET_URL, { waitUntil: 'networkidle2' });
      
      // Wait a bit
      await new Promise(r => setTimeout(r, 5000));

      console.log('Taking screenshot...');
      await page.screenshot({ path: SCREENSHOT_PATH, fullPage: true });
      console.log(`Screenshot saved to: ${SCREENSHOT_PATH}`);

      const html = await page.content();
      console.log(`HTML Length: ${html.length}`);
      console.log(`Contains "Джингл сет": ${html.includes('Джингл сет')}`);
      console.log(`Contains "h1": ${html.includes('<h1')}`);

  } catch (e) {
      console.error(e);
  }
  
  await browser.close();
}

run();
