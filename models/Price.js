const { db } = require('../database/index.js');

//write a function that searches the prices table for a ticker and returns the number of rows

module.exports.getTickerCount = async (ticker) => {
  const data = await db.Price.findAll({
    where: {
      ticker: ticker,
    },
  });
  return data.length;
};
