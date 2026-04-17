import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Wait for React to mount
  await page.goto('http://localhost:4173/en/about', { waitUntil: 'networkidle0' });
  
  // Evaluate the layout metrics
  const info = await page.evaluate(() => {
    const main = document.querySelector('main');
    const sections = Array.from(document.querySelectorAll('main > *'));
    return {
      main: {
        offsetTop: main.offsetTop,
        className: main.className,
        style: main.style.cssText,
        clientHeight: main.clientHeight,
        boundingTop: main.getBoundingClientRect().top
      },
      firstSection: sections.length > 0 ? {
        className: sections[0].className,
        boundingTop: sections[0].getBoundingClientRect().top,
        opacity: window.getComputedStyle(sections[0]).opacity
      } : null,
      scrollRevealElements: Array.from(document.querySelectorAll('.will-change-transform')).map(el => ({
        className: el.className,
        boundingTop: el.getBoundingClientRect().top,
        opacity: window.getComputedStyle(el).opacity
      }))
    };
  });
  
  console.log(JSON.stringify(info, null, 2));
  
  await browser.close();
})();
