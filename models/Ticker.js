const { db } = require('../database/index.js');

module.exports.getTickers = async (filter = {}, order = {}) => {
  const data = await db.Ticker.findAll();
  return data.map((row) => ({ ticker: row.ticker, name: row.name }));
};
