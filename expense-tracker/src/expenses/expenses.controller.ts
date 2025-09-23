import { Router, Request, Response } from 'express';
import { ExpensesService } from './expenses.service.js';
import { CreateExpenseDto, createExpenseSchema } from './dto/create-expense.dto.js';
import { validationMiddleware } from '../helpers/middlewares/validator.js';

export class ExpensesController {
  public router = Router();

  constructor(private readonly expensesService: ExpensesService) {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.post('/', validationMiddleware(createExpenseSchema), this.create);
    this.router.get('/', this.findAll);
    this.router.get('/:id', this.find);
  };

  private create = async (req: Request, res: Response) => {
    const expense = await this.expensesService.create(
      req.body as CreateExpenseDto,
    );
    res.status(201).json(expense);
  };

  private findAll = async (req: Request, res: Response) => {
    const expenses = await this.expensesService.findAll();
    res.status(200).json(expenses);
  };

  private find = async (req: Request, res: Response) => {
    const expense = await this.expensesService.find(Number(req.params.id));
    res.status(200).json(expense);
  };
}
