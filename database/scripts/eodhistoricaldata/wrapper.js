require('dotenv').config();
const axios = require('axios');
const KEY = process.env.EOD;

module.exports.fetchTickers = async () => {
  let URL = `https://eodhistoricaldata.com/api/exchange-symbol-list/US?api_token=${KEY}&fmt=json`;
  const res = await axios.get(URL);
  return res.data.map((x) => ({
    ticker: x.Code,
    name: x.Name,
    country: x.Country,
    exchange: x.Exchange,
    currency: x.Currency,
    type: x.Type,
    isin: x.Isin,
  }));
};

module.exports.fetchPrices = async (ticker) => {
  //fetch all historical prices for a single ticker from EOD API

  let URL = `https://eodhistoricaldata.com/api/eod/${ticker}?api_token=${KEY}&fmt=json&from=2000-01-01`;
  const res = await axios.get(URL);
  return res.data.map((x) => ({
    ticker: ticker,
    ...x,
  }));
};

module.exports.fetchUserData = async () => {
  const URL = `https://eodhistoricaldata.com/api/user/?api_token=${KEY}&fmt=json`;
  const res = await axios.get(URL);
  return res.data;
};

module.exports.fetchTradingDates = async () => {
  const URL = `https://eodhistoricaldata.com/api/eod/VFINX?api_token=${KEY}&fmt=json&from=2000-01-01`;
  const res = await axios.get(URL);
  return res.data.map((x) => x.date);
};
