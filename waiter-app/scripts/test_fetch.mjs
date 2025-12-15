
fetch('https://tanukifamily.ru/tanuki/msk/', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
})
  .then(r => r.text())
  .then(t => {
    console.log('Page length:', t.length);
    console.log('Has Roll Midori:', t.includes('Ролл Мидори'));
    // console.log(t.substring(0, 500)); // Show beginning
  })
  .catch(console.error);
