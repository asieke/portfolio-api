const { Request, Response } = require('express');

const getBenchmark = async (req, res) => {
  res.json({ hello: 'world' });
};

module.exports = getBenchmark;
