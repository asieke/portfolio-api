const { fetchTickers } = require('./polygon.js');
const { db, sequelize } = require('../index');

const main = async () => {
  console.log('FETCHING TICKERS...');

  let count = 0;

  const helper = async (URL) => {
    count += 1000;
    console.log('...fetched Tickers N=', count);
    const res = await fetchTickers(1000, URL);

    for (let i = 0; i < res.data.results.length; i++) {
      await db.TickerPolygon.upsert(res.data.results[i]);
    }

    if (res.data.next_url) {
      await helper(res.data.next_url);
    }
  };

  await helper();
};

main();
