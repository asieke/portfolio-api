require('dotenv').config();

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'postgres',
  logging: false,
});

const db = {
  Ticker: sequelize.define('tickers', {
    ticker: {
      unique: true,
      type: Sequelize.STRING,
    },
    active: Sequelize.BOOLEAN,
    cik: Sequelize.STRING,
    composite_figi: Sequelize.STRING,
    currency_name: Sequelize.STRING,
    last_updated_utc: Sequelize.DATE,
    locale: Sequelize.STRING,
    market: Sequelize.STRING,
    name: Sequelize.STRING,
    primary_exchange: Sequelize.STRING,
    share_class_figi: Sequelize.STRING,
    type: Sequelize.STRING,
    total_employees: Sequelize.BIGINT,
    homepage_url: Sequelize.STRING,
    logo_url: Sequelize.STRING,
    market_cap: Sequelize.BIGINT,
    share_class_shares_outstanding: Sequelize.BIGINT,
    weighted_shares_outstanding: Sequelize.BIGINT,
    description: Sequelize.TEXT,
  }),
  //create a table called HistoricalTicker with columns ticker, date, market_cap, total_employees, share_class_shares_outstanding, weighted_shares_outstanding
  HistoricalTicker: sequelize.define('historical_tickers', {
    ticker: Sequelize.STRING,
    date: Sequelize.DATE,
    market_cap: Sequelize.BIGINT,
    total_employees: Sequelize.BIGINT,
    share_class_shares_outstanding: Sequelize.BIGINT,
    weighted_shares_outstanding: Sequelize.BIGINT,
  }),
  initialize: async () => {
    await db.Ticker.sync({ force: true });
    await db.HistoricalTicker.sync({ force: true });
  },
  close: async () => {
    await sequelize.close();
  },
};

module.exports = { db, sequelize };
