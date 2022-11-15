const { db, sequelize } = require('../index');

const main = async () => {
  console.log('UPDATING HISTORICAL TICKER DATA...');
  //fetch all ticker data where market_cap or total_employees is not null

  const [tickers, metadata] = await sequelize.query(
    'SELECT ticker, NOW() as date, market_cap, total_employees, share_class_shares_outstanding, weighted_shares_outstanding FROM tickers WHERE market_cap IS NOT NULL OR total_employees IS NOT NULL'
  );

  await db.HistoricalTicker.bulkCreate(tickers);

  db.close();
};

main();
