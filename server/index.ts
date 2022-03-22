import express, { Express } from 'express';
const app: Express = express();
app.use(express.json());
const port: Number = 3000;

import controller from '../controllers/benchmark';

app.get('/benchmark', controller.getBenchmark);

app.listen(port, () => {
  console.log('Server is running at http://localhost:' + port);
});
