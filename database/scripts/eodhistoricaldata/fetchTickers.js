const { db, sequelize } = require('../../index.js');
const { fetchTickers, fetchPricesBulk } = require('./wrapper.js');

const main = async () => {
  console.log('FETCHING EOD TICKERS...');

  const data = await fetchTickers();
  console.log('...ticker data fetched');

  for (let i = 0; i < data.length; i++) {
    await db.Ticker.upsert(data[i]);
  }
  console.log('...ticker data inserted');

  const prices = await fetchPricesBulk('US');
  console.log('...price data fetched');

  for (let i = 0; i < prices.length; i++) {
    await db.Ticker.upsert(prices[i]);
  }
  console.log('...price data inserted');

  await db.close();
};

main();
