const puppeteer = require('puppeteer');

async function getPic() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('https://mangakakalot.com');
  await page.setViewport({width: 1000, height: 1000});
  await page.screenshot({path: 'manga.png'});

  await browser.close();
}

getPic();