import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
  
  const info = await page.evaluate(() => {
    return {
      heroHeight: document.getElementById('hero')?.clientHeight,
      statsHeight: document.getElementById('stats-section')?.clientHeight,
      portfolioHeight: document.getElementById('portfolio-section')?.clientHeight,
      numImg: document.querySelectorAll('img').length,
    };
  });
  
  console.log('DOM metrics:', JSON.stringify(info, null, 2));
  await browser.close();
})();
