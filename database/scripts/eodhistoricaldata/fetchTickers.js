const { db, sequelize } = require('../../index.js');
const { fetchTickers } = require('./wrapper.js');

const main = async () => {
  console.log('FETCHING EOD TICKERS...');
  const data = await fetchTickers();
  console.log('...data fetched');
  for (let i = 0; i < data.length; i++) {
    await db.Ticker.upsert(data[i]);
  }
  console.log('...data inserted');
  await db.close();
};

main();
