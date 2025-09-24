import express, { Request, Response } from 'express';
import config from './config/index.js';

const app = express();

app.get('/api/ping', (req: Request, res: Response) => {
  res.json({ message: 'pong' });
});

export const start = () => {
  app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
  });
};
