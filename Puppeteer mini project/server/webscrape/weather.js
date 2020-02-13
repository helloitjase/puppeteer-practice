const puppeteer = require('puppeteer');

const weatherScraper = async() => {
  const browser = await puppeteer.launch();
  try{
    const page = await browser.newPage();
  
    await page.goto('https://weather.com/weather/tenday/l/31fd18eaba5d22c79184fc8fc8ce48277aa77bfbb722dc3af3e403eaa2b434c8', {waitUntil: 'load'});
    const result = await page.evaluate(() => {
      const dayDeets = document.querySelectorAll('.day-detail');
      const daySpecific = document.querySelectorAll('.date-time');
      const dayDescrip = document.querySelectorAll('.description') //span instead of description
      const dayTemp = document.querySelectorAll('.temp') //all spans inside of temp
  
      const weather10Day = [];
      for (let i = 0; i < dayDeets.length; i++) {
        let day = dayDeets[i] ? dayDeets[i].innerText : undefined;
        let daySpecs = daySpecific[i] ? daySpecific[i].innerText: undefined;
        let dayDescrips = dayDescrip[i].querySelector('span') ? dayDescrip[i].querySelector('span').innerText : undefined;
        let dayTemps = dayTemp[i].querySelectorAll('span') ? dayTemp[i].querySelectorAll('span') : undefined;
        if (dayTemps !== undefined) {
          let temps = '';
          dayTemps.forEach((item) => {
            if (item !== undefined) {
              temps += item.innerText
            }
        });
          dayTemps = temps;
        }
        weather10Day.push({
          day,
          daySpecs,
          dayDescrips,
          dayTemps
        })
      }
      return weather10Day;
    })
    
    browser.close();
    return result;
  } catch(err) {
    console.log(err);
    browser.close();
  }
}

weatherScraper().then((result) => {
  console.log(result);
})