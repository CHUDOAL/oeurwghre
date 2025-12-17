
import fs from 'fs';

const url = 'https://api.tanukifamily.ru/v1/products-picks?brandId=10';
const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/json',
  'Origin': 'https://tanukifamily.ru',
  'Referer': 'https://tanukifamily.ru/'
};

fetch(url, { headers })
  .then(r => r.json())
  .then(data => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(console.error);


