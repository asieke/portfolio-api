const { pool } = require('../../index.js');
const { fetchHistoricalData } = require('../../fetch/alphaVantage.js');
const { sleep } = require('../../../lib/utils');

const main = async () => {
  let SQL = `SELECT ticker FROM historical_assets`;

  let res = await pool.query(SQL);
  let tickers = res.rows.map((x) => x.ticker);

  for (let i = 0; i < tickers.length; i++) {
    console.log('updating ticker: ', tickers[i]);
    let SQL = `SELECT max(date) from historical_prices where ticker = '${tickers[i]}'`;
    let res = await pool.query(SQL);
    let startDate = new Date(res.rows[0].max.getTime() + 24 * 60 * 60 * 1000)
      .toISOString()
      .substr(0, 10);
    let endDate = new Date().toISOString().substr(0, 10);
    let data = await fetchHistoricalData(tickers[i], startDate, endDate);

    for (let j = 0; j < data.length; j++) {
      let SQL = ['INSERT INTO historical_prices(ticker, close, date) values($1, $2, $3)'];
      let VALUES = [[data[j].ticker, data[j].close, data[j].date]];
      if (data[j].dividend && data[j].dividend !== 0) {
        SQL.push(
          'INSERT INTO historical_actions(ticker, date, type, value) values($1, $2, $3, $4)'
        );
        VALUES.push([data[j].ticker, data[j].date, 'dividend', data[j].dividend]);
      }
      if (data[j].split && data[j].split !== 1) {
        SQL.push(
          'INSERT INTO historical_actions(ticker, date, type, value) values($1, $2, $3, $4)'
        );
        VALUES.push([data[j].ticker, data[j].date, 'split', data[j].split]);
      }

      try {
        for (let k = 0; k < SQL.length; k++) {
          await pool.query(SQL[k], VALUES[k]);
        }
      } catch (e) {
        console.log(e);
      }
    }

    await sleep(15000);
  }

  pool.end();
};

main();
