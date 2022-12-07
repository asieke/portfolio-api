require('dotenv').config();

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'postgres',
  logging: false,
});

let dividend_data = {
  date: '2012-08-09',
  declarationDate: '2012-07-24',
  recordDate: '2012-08-13',
  paymentDate: '2012-08-16',
  period: 'Quarterly',
  value: 0.0946,
  unadjustedValue: 2.6488,
  currency: 'USD',
};

const db = {
  //create a table called TickerEOD with columns from out
  Ticker: sequelize.define(
    'tickers',
    {
      ticker: Sequelize.STRING,
      name: Sequelize.STRING,
      country: Sequelize.STRING,
      exchange: Sequelize.STRING,
      currency: Sequelize.STRING,
      type: Sequelize.STRING,
      isin: Sequelize.STRING,
      market_cap: Sequelize.FLOAT,
      avgvol_14d: Sequelize.FLOAT,
      close: Sequelize.FLOAT,
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['ticker'],
        },
      ],
    }
  ),

  Price: sequelize.define(
    'prices',
    {
      ticker: Sequelize.STRING,
      date: Sequelize.DATEONLY,
      market_cap: Sequelize.FLOAT,
      beta: Sequelize.FLOAT,
      open: Sequelize.FLOAT,
      high: Sequelize.FLOAT,
      low: Sequelize.FLOAT,
      close: Sequelize.FLOAT,
      adjusted_close: Sequelize.FLOAT,
      volume: Sequelize.FLOAT,
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['ticker', 'date'],
        },
      ],
    }
  ),

  Split: sequelize.define(
    'splits',
    {
      ticker: Sequelize.STRING,
      date: Sequelize.DATEONLY,
      from: Sequelize.FLOAT,
      to: Sequelize.FLOAT,
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['ticker', 'date'],
        },
      ],
    }
  ),

  Dividend: sequelize.define(
    'dividends',
    {
      ticker: Sequelize.STRING,
      date: Sequelize.DATEONLY,
      declarationDate: Sequelize.DATEONLY,
      recordDate: Sequelize.DATEONLY,
      paymentDate: Sequelize.DATEONLY,
      period: Sequelize.STRING,
      value: Sequelize.FLOAT,
      unadjustedValue: Sequelize.FLOAT,
      currency: Sequelize.STRING,
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['ticker', 'date'],
        },
      ],
    }
  ),

  initialize: async () => {
    await db.Ticker.sync({ force: true });
    await db.Price.sync({ force: true });
    await db.Split.sync({ force: true });
    await db.Dividend.sync({ force: true });
  },
  close: async () => {
    await sequelize.close();
  },
};

module.exports = { db, sequelize };
