const { db, sequelize } = require('../../index.js');
const { fetchPrices } = require('./wrapper.js');

const main = async () => {
  console.log('FETCHING EOD DATA...');
  const data = await fetchPrices('US');
  console.log('...data fetched');
  for (let i = 0; i < data.length; i++) {
    await db.Price.upsert(data[i]);
    await db.Ticker.update(
      { close: data[i].close, market_cap: data[i].market_cap },
      { where: { ticker: data[i].ticker } }
    );
  }
  console.log('...data inserted');
};

main();
