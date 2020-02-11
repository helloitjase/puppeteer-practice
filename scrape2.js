const puppeteer = require('puppeteer');

(async() => {
  try{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://scrapethissite.com/pages/forms');
    
    const result = await page.evaluate(() => {
      const grabFromRow = (row, classname) => row.querySelector(`td.${classname}`).innerText.trim();

      const team = 'tr.team';
      const data = [];
      const teamRows = document.querySelectorAll(team);

      teamRows.forEach((team) => {
        data.push({
          name: grabFromRow(team, 'name'),
          year: grabFromRow(team, 'year'),
        })
      })
      return data;
    })
    console.log(result);
    browser.close();
    return result

  } catch(error) {
    console.log(error);
  }
})()
