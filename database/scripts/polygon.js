require('dotenv').config();
const axios = require('axios');
const KEY = process.env.POLYGON;
const { timestampToDate } = require('../../lib/utils.js');

const fetchPrices = async (ticker, start, end) => {
  const URL = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${start}/${end}?adjusted=false&sort=asc&limit=5000&apiKey=${KEY}`;
  const res = await axios.get(URL);
  const data = res.data.results.map((x) => ({ date: timestampToDate(x.t), price: x.c }));

  console.log(data);
};

const fetchTickerDetails = async (ticker) => {
  const URL = `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=rzkDwHfU15ptFN5IxfbAbcAzUw4EWECo&apiKey=${KEY}`;
  const res = await axios.get(URL);
  const data = res.data;
  return data;
};

const fetchDividends = async (ticker) => {
  const URL = `https://api.polygon.io/v3/reference/dividends?ticker=${ticker}&order=desc&limit=5&apiKey=${KEY}`;
  const res = await axios.get(URL);
  const data = res.data.results;

  console.log(data);
};

const fetchSplits = async (ticker) => {
  const URL = `https://api.polygon.io/v3/reference/splits?ticker=${ticker}&order=desc&limit=5&apiKey=${KEY}`;
  const res = await axios.get(URL);
  const data = res.data.results;

  console.log(data);
};

const fetchTickers = async (limit, url) => {
  let URL =
    (url ||
      `https://api.polygon.io/v3/reference/tickers?active=true&sort=ticker&order=asc&limit=${limit}`) +
    `&apiKey=${KEY}`;

  const res = await axios.get(URL);
  return res;
};

module.exports = { fetchPrices, fetchDividends, fetchSplits, fetchTickers, fetchTickerDetails };
