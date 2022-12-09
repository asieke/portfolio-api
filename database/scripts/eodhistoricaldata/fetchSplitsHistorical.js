const { db, sequelize } = require('../../index.js');
const { fetchSplits } = require('./wrapper.js');
const { getActiveTickers } = require('../../../models/Ticker.js');

const main = async () => {
  // fetchUserData and output to console

  const data = await getActiveTickers();

  for (let i = 0; i < data.length; i++) {
    const splits = await fetchSplits(data[i].ticker);
    for (let j = 0; j < splits.length; j++) {
      await db.Split.upsert(splits[j]);
    }
    console.log(`[${i},${data.length}]`, '...data inserted', data[i].ticker, splits.length);
  }

  db.close();
};

main();
