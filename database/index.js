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

  //create a users table
  User: sequelize.define('users', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    name: Sequelize.STRING,
    email: Sequelize.STRING,
  }),

  //create a table called Portfolio that tracks a user's portfolio
  Portfolio: sequelize.define('portfolios', {
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    //create a foreign key that links to the user table
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  }),

  //create a table called account_types that tracks the type of account
  AccountType: sequelize.define('account_types', {
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    taxable: Sequelize.BOOLEAN,
  }),

  //create a table called Accounts, each account belongs to a portfolio create a foreign key that links account to portfolio
  Account: sequelize.define('accounts', {
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    portfolioId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'portfolios',
        key: 'id',
      },
    },
    //create a foreign key that links account to account_type
    accountTypeId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'account_types',
        key: 'id',
      },
    },
  }),

  //create a table called Positions, each position belongs to an account
  Position: sequelize.define('positions', {
    ticker: Sequelize.STRING,
    quantity: Sequelize.FLOAT,
    accountId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'accounts',
        key: 'id',
      },
    },
  }),

  //create a table called Transactions, each transaction belongs to an account
  Transaction: sequelize.define('transactions', {
    date: Sequelize.DATE,
    ticker: Sequelize.STRING,
    quantity: Sequelize.FLOAT,
    price: Sequelize.FLOAT,
    action: Sequelize.STRING,
    fees: Sequelize.FLOAT,
    accountId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'accounts',
        key: 'id',
      },
    },
  }),

  initialize: async () => {
    await db.Ticker.sync({ force: true });
    await db.Price.sync({ force: true });
    await db.Split.sync({ force: true });
    await db.Dividend.sync({ force: true });
    await db.User.sync({ force: true });
    await db.Portfolio.sync({ force: true });
    await db.AccountType.sync({ force: true });
    await db.Account.sync({ force: true });
    await db.Transaction.sync({ force: true });
  },
  close: async () => {
    await sequelize.close();
  },
};

module.exports = { db, sequelize };
