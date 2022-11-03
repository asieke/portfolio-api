module.exports.sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

module.exports.timestampToDate = (ts) => {
  return new Date(ts).toISOString().substring(0, 10);
};
