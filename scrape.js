const puppeteer = require('puppeteer');

let scrape = async() => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://books.toscrape.com/');
    // await page.waitFor(1000);
    
    // const result = await page.evaluate(() => {
    //   let results = [];
    //   let books = document.querySelectorAll('article');
    //   for (let i = 0; i < books.length; i++) {
    //     let title = books[i].querySelector('h3 a').innerText;
    //     let price = books[i].querySelector('.price_color').innerText;
    //     results.push({title, price});
    //   }
    //   return results;
    // })
  
    await page.pdf({path: 'books.toScrape.pdf' });
    browser.close();

  } catch(error) {
    console.log
  }
  // return result;

}

// scrape().then((value) => {
//   console.log(value);
// })

scrape();