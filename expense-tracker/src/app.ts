import express, { Request, Response } from 'express';
import config from './config/index.js';
import { ExpensesController } from './expenses/expenses.controller.js';
import { ExpensesService } from './expenses/expenses.service.js';
import { ExpensesRepository } from './expenses/expenses.repository.js';

const app = express();

app.use(express.json());

const expensesRepository = new ExpensesRepository();
const expensesService = new ExpensesService(expensesRepository);
const expensesController = new ExpensesController(expensesService);

app.use('/api/expenses', expensesController.router);

app.get('/api/ping', (req: Request, res: Response) => {
  res.json({ message: 'pong' });
});

export const start = () => {
  app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
  });
};
