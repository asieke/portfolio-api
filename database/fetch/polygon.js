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

// fetchPrices('AAPL', '2022-10-01', '2022-11-04');

fetchDividends('VTI');
