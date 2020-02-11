const puppeteer = require('puppeteer');
const fs = require('fs');

const scrapeY = async() => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://news.ycombinator.com');
    const results = await page.evaluate(() => {
      const getInfo = (row, className) => {
        return row.querySelector(className).innerText;
      }
      let data = [];
      let news = document.querySelectorAll('tr.athing');
  
      for (let i = 0; i < 10; i++) {
        newk = news[i];
        data.push({
          title: getInfo(newk, 'td .storylink'),
          link: newk.querySelector('.storylink').getAttribute('href')
        })
      }
      return data;
    })
    browser.close();
    fs.writeFile('./ycombinwebscrape.json', JSON.stringify(results), (err) => {
      if (err) {
        console.log(err);
      }
      console.log('data written');
    })
  } catch(err) {
    console.log(err);
    browser.close();
  }
}

scrapeY();

