const puppeteer = require('puppeteer');
const fs = require('fs');

const searchScrape = async() => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto('https://news.ycombinator.com/', {waitUntil: 'load'});
    await page.type('#hnmain > tbody > tr:nth-child(4) > td > center:nth-child(6) > form > input[type=text]', 'HN');
    await page.click('#hnmain > tbody > tr:nth-child(4) > td > center:nth-child(6) > form > input[type=text]');
    await page.keyboard.press('Enter');
    await page.waitForNavigation();
    const result = await page.evaluate(() => {
      let results = [];
      let titles = document.querySelectorAll('.Story_title')
      let points = document.querySelectorAll('.Story_meta');
      for (let i = 0; i < titles.length; i++) {
        let title = titles[i].innerText;
        let point = points[i].querySelector('span:nth-child(1) a').innerText;
        let link = points[i].querySelector('span a').getAttribute('href');
        let info = {
          title,
          point,
          link
        }
        results.push(info);
      }

      return results;
    })
    
    fs.writeFile('./newsYCombSearch.json', JSON.stringify(result), (err) => {
      if (err) {
        console.log('hit');
        throw err;
      }
      console.log('file written');
    })
    

    
  } catch(err) {
    console.log(err);
  } finally {
    browser.close();
  }
 

}

searchScrape();