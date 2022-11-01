require('dotenv').config();
const axios = require('axios');

const BASE = 'https://www.alphavantage.co/query';
const KEY = process.env.ALPHAVANTAGE;

const fetchCryptoData = async (ticker, start, end) => {
  const FUNC = '?function=DIGITAL_CURRENCY_DAILY';
  const OPTIONS = '&symbol=' + ticker + '&market=USD&apikey=' + KEY;
  const URL = BASE + FUNC + OPTIONS;

  const res = await axios.get(URL);
  const data = res.data['Time Series (Digital Currency Daily)'];
  const dates = Object.keys(data);

  let out = [];
  for (let i = dates.length - 1; i >= 0; i--) {
    if (dates[i] < start || dates[i] > end) continue;

    out.push({
      ticker: ticker,
      date: dates[i],
      close: parseFloat(data[dates[i]]['4a. close (USD)']),
    });
  }

  return out;
};

const fetchSecuritiesData = async (ticker, start, end) => {
  const FUNC = '?function=TIME_SERIES_DAILY_ADJUSTED';
  const OPTIONS = '&symbol=' + ticker + '&outputsize=full&apikey=' + KEY;
  const URL = BASE + FUNC + OPTIONS;

  console.log(URL);

  const res = await axios.get(URL);
  const data = res.data['Time Series (Daily)'];
  const dates = Object.keys(data);

  let out = [];
  for (let i = dates.length - 1; i >= 0; i--) {
    if (dates[i] < start || dates[i] > end) continue;

    out.push({
      ticker: ticker,
      date: dates[i],
      close: parseFloat(data[dates[i]]['4. close']),
      adjusted: parseFloat(data[dates[i]]['5. adjusted close']),
      dividend: parseFloat(data[dates[i]]['7. dividend amount']),
      split: parseFloat(data[dates[i]]['8. split coefficient']),
    });
  }

  return out;
};

const fetchHistoricalData = async (ticker, start, end) => {
  if (ticker !== 'BTC' && ticker !== 'ETH') {
    let out = await fetchSecuritiesData(ticker, start, end);
    return out;
  } else {
    let out = await fetchCryptoData(ticker, start, end);
    return out;
  }
};

module.exports = { fetchHistoricalData };
