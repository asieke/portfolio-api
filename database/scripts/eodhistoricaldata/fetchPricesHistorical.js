const { db, sequelize } = require('../../index.js');
const { fetchPrices, fetchUserData, fetchTradingDates } = require('./wrapper.js');
const { getTickers } = require('../../../models/Ticker.js');
const { getTickerCount } = require('../../../models/Price.js');

const THRESHOLD = 80000;

const main = async () => {
  // fetchUserData and output to console

  const data = await getTickers();

  for (let i = 0; i < data.length; i++) {
    let count = await getTickerCount(data[i].ticker);

    if (count === 0) {
      const prices = await fetchPrices(data[i].ticker);
      await db.Price.bulkCreate(prices);
      console.log(`[${i},${data.length}]`, '...data inserted', data[i].ticker, prices.length);
    } else {
      console.log(`[${i},${data.length}]`, '...data skipped', data[i].ticker);
    }
  }

  db.close();
};

main();
