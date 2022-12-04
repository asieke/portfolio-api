const { fetchTickerDetails } = require('./polygon.js');
const { db, sequelize } = require('../index');
const { Op } = require('sequelize');
const { SNP } = require('../../lib/data.js');

const main = async () => {
  console.log('FETCHING TICKER DETAILS...');

  const tickers = await db.TickerPolygon.findAll();

  for (let i = 0; i < tickers.length; i++) {
    //only fetch details for tickers that are in SNP
    if (SNP.includes(tickers[i].ticker)) {
      console.log('...fetched Tickers Details N=', i, tickers[i].ticker);

      const data = await fetchTickerDetails(tickers[i].ticker);
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
        market_cap: market_cap,
        description,
      };

      //update the database with tickerDetails where ticker=ticker
      await db.TickerPolygon.update(tickerDetails, {
        where: {
          ticker: tickerDetails.ticker,
        },
      });
    }
  }

  db.close();
};

main();
