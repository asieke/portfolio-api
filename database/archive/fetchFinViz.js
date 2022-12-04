const axios = require('axios');
const { db, sequelize } = require('../index');

const { sleep } = require('../../lib/utils.js');

const main = async () => {
  for (let page = 1; page <= 10000; page += 20) {
    console.log(page, '...', 10000);
    await sleep(250);
    let url = 'https://finviz.com/screener.ashx?v=111&o=-marketcap&r=' + page;

    let response = await axios.get(url);
    let lines = response.data.split('\n');

    let textToParse = '';
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].indexOf('screener-body-table') !== -1) {
        textToParse += lines[i];
      }
    }

    //parse the results
    let results = textToParse.match(/>(.*?)</gm);

    results = results
      .map((x) => x.substring(1, 1 + x.length - 2).replaceAll('&nbsp;', ''))
      .filter((x) => x.length > 0 && x.indexOf('offset') === -1);

    //iterate through results string and extract data
    for (let i = 0; i < results.length; i += 15) {
      //push the html parsed results
      if (!results[i + 7]) continue;

      let unit = results[i + 8].slice(-1);

      let data = {
        ticker: results[i + 3].replaceAll('-', '.'),
        name: results[i + 4],
        sector: results[i + 5],
        industry: results[i + 6],
        country: results[i + 7],
        market_cap: parseFloat(results[i + 8]) * (unit === 'M' ? 1000000 : 1000000000),
        pe: parseFloat(results[i + 9]),
        price: parseFloat(results[i + 12]),
        volume: parseFloat(results[i + 14].replaceAll(',', '')),
      };

      await db.TickerFinViz.upsert(data);
    }
  }

  db.close();
};

main();
