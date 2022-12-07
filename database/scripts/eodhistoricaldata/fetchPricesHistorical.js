const { db, sequelize } = require('../../index.js');
const { fetchPrices } = require('./wrapper.js');
const { getActiveTickers } = require('../../../models/Ticker.js');
const { getTickerCount } = require('../../../models/Price.js');

const main = async () => {
  //get only the active tickers - those with nonzero volume on real exchanges
  const data = await getActiveTickers();

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
