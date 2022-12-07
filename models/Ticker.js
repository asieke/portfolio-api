const { db } = require('../database/index.js');
const { Op } = require('sequelize');

module.exports.getTickers = async (filter = {}, order = {}) => {
  const data = await db.Ticker.findAll();
  return data.map((row) => ({ ticker: row.ticker, name: row.name }));
};

module.exports.getActiveTickers = async () => {
  const data = await db.Ticker.findAll({
    where: {
      avgvol_14d: { [Op.gt]: 0 },
      exchange: { [Op.and]: [{ [Op.notLike]: '%PINK%' }, { [Op.notLike]: '%OTC%' }] },
      type: { [Op.ne]: 'Preferred Stock' },
    },
  });

  return data.map((row) => ({ ticker: row.ticker, name: row.name }));
};
