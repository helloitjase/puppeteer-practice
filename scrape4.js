const puppeteer = require('puppeteer');

const scraper4 = async() => {
  const browser = await puppeteer.launch();
  try {

  
    const page = await browser.newPage();
    
    await page.goto('http://www.meteocentrale.ch/it/europa/svizzera/meteo-corvatsch/details/S067910/', {waitUntil: 'load'});

    const result = await page.evaluate(() => {
      let weather = [];
      let weatherSelectTime = document.querySelectorAll('tr .time');
      let weatherSelectTemperature = document.querySelectorAll('[title="Temperatura"]');
      let weatherSelectWind = document.querySelectorAll('[title="Raffiche"]');
      
      
      for (let i = 0; i < weatherSelectTime.length; i++) {
        let time = weatherSelectTime[i].firstChild ? weatherSelectTime[i].firstChild.innerText: undefined;
        let temp = weatherSelectTemperature[i] ? weatherSelectTemperature[i].innerText: undefined;
        let wind = weatherSelectWind[i] ? weatherSelectWind[i].innerText : undefined;
        weather.push({
          time,
          temp,
          wind
        })
      }
      return weather;
    })
    console.log('result', result);
    
    browser.close();
  } catch(err) {
    console.log(err);
    browser.close();
  }
}

scraper4();
