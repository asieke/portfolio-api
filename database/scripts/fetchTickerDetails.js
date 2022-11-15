const { fetchTickerDetails } = require('./polygon.js');
const { db, sequelize } = require('../index');
const { Op } = require('sequelize');

const main = async () => {
  console.log('FETCHING TICKER DETAILS...');

  const tickers = await db.Ticker.findAll();

  for (let i = 0; i < tickers.length; i++) {
    const data = await fetchTickerDetails(tickers[i].ticker);

    console.log(i, tickers.length, tickers[i].id);

    const {
      ticker,
      total_employees,
      homepage_url,
      branding,
      share_class_shares_outstanding,
      weighted_shares_outstanding,
      market_cap,
      description,
    } = data.results;

    const tickerDetails = {
      ticker,
      total_employees,
      homepage_url,
      logo_url: branding ? branding.logo_url || null : null,
      share_class_shares_outstanding,
      weighted_shares_outstanding,
      market_cap: Math.floor(market_cap) || null,
      description,
    };

    //update the database with tickerDetails where ticker=ticker
    await db.Ticker.update(tickerDetails, {
      where: {
        ticker: tickerDetails.ticker,
      },
    });
  }

  db.close();
};

main();
