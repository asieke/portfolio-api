const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

const getBenchmark = require('../controllers/benchmark');

app.get('/benchmark', getBenchmark);

app.listen(port, () => {
  console.log('Server is running at http://localhost:' + port);
});
