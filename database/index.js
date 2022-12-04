require('dotenv').config();

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'postgres',
  logging: false,
});

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

  initialize: async () => {
    await db.Ticker.sync({ force: true });
    await db.Price.sync({ force: true });
  },
  close: async () => {
    await sequelize.close();
  },
};

module.exports = { db, sequelize };
