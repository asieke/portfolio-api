import { Request, Response } from 'express';

const getBenchmark = (req: Request, res: Response) => {
  console.log(req);
  res.json({ hello: 'world3' });
};

export default { getBenchmark };
