const axios = require('axios');

async function probeApi() {
  const endpoints = [
    'https://api.tanukifamily.ru/v1/categories?brandId=10&cityId=1',
    'https://api.tanukifamily.ru/v1/products?brandId=10&cityId=1',
    'https://api.tanukifamily.ru/v1/menu?brandId=10&cityId=1',
    'https://api.tanukifamily.ru/tanuki/msk/menu' // sometimes they use same path
  ];

  for (const url of endpoints) {
    try {
      console.log(`Trying ${url}...`);
      const { data } = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Origin': 'https://tanukifamily.ru',
          'Referer': 'https://tanukifamily.ru/'
        }
      });
      console.log(`SUCCESS: ${url}`);
      console.log('Keys:', Object.keys(data));
      if (data.payload) console.log('Payload keys:', Object.keys(data.payload));
      if (Array.isArray(data)) console.log('Array length:', data.length);
      
      // If we found products/categories, let's look closer
      if (url.includes('categories') && data.payload) {
         console.log('Categories found!');
         // Try to find a category ID to fetch products
         if (data.payload.length > 0) {
           console.log('First category:', data.payload[0]);
         }
      }
    } catch (error) {
      console.log(`FAILED: ${url} - ${error.response ? error.response.status : error.message}`);
    }
  }
}

probeApi();

