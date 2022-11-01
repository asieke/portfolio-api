const { fetchHistoricalData } = require('../../fetch/alphaVantage.js');
const { pool } = require('../../index.js');
const { sleep } = require('../../../lib/utils');
const fs = require('fs/promises');
const path = require('path');

const main = async () => {
  let SQL = `
    SELECT ticker
    FROM historical_assets
    WHERE asset_class != 'Cryptocurrency'
  `;
  const tickerData = await pool.query(SQL);

  let tickers = tickerData.rows.map((x) => x.ticker);

  let prices = [];
  let actions = [];

  for (let i = 0; i < tickers.length; i++) {
    console.log('fetching....', tickers[i]);
    let data = await fetchHistoricalData(tickers[i], '2000-01-01', '2023-01-01');
    data.forEach((x) => {
      if (x.split !== 1) {
        actions.push([x.ticker, 'split', x.date, x.split].join('\t'));
      }
      if (x.dividend !== 0) {
        actions.push([x.ticker, 'dividend', x.date, x.dividend].join('\t'));
      }
    });
    prices.push(data.map((x) => [x.ticker, x.date, x.close].join('\t')).join('\n'));
    await sleep(15000);
  }

  await fs.writeFile(path.join(__dirname, '../csv/historical_prices.csv'), prices.join('\n'));
  await fs.writeFile(path.join(__dirname, '../csv/historical_actions.csv'), actions.join('\n'));

  pool.end();
};

main();
