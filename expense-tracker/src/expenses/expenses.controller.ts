import { Router, Request, Response, NextFunction } from 'express';
import { ExpensesService } from './expenses.service.js';
import {
  CreateExpenseDto,
  createExpenseSchema,
} from './dto/create-expense.dto.js';
import {
  UpdateExpenseDto,
  updateExpenseSchema,
} from './dto/update-expense.dto.js';
import { GetExpensesDto } from './dto/get-expenses.dto.js';
import { validationMiddleware } from '../helpers/middlewares/validator.js';

export class ExpensesController {
  public router = Router();

  constructor(private readonly expensesService: ExpensesService) {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.post(
      '/',
      validationMiddleware(createExpenseSchema),
      this.create,
    );
    this.router.get('/', this.findAll);
    this.router.get('/:id', this.find);
    this.router.patch(
      '/:id',
      validationMiddleware(updateExpenseSchema),
      this.update,
    );
    this.router.delete('/:id', this.delete);
  };

  private create = async (req: Request, res: Response) => {
    const expense = await this.expensesService.create(
      req.body as CreateExpenseDto,
    );
    res.status(201).json(expense);
  };

  private findAll = async (req: Request, res: Response) => {
    const { limit, offset, fromDate, toDate } = req.query;
    const expenses = await this.expensesService.findAll({
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      fromDate: fromDate as string,
      toDate: toDate as string,
    } as GetExpensesDto);
    res.status(200).json(expenses);
  };

  private find = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expense = await this.expensesService.find(Number(req.params.id));
      res.status(200).json(expense);
    } catch (error) {
      next(error);
    }
  };

  private update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expense = await this.expensesService.update(
        Number(req.params.id),
        req.body as UpdateExpenseDto,
      );
      res.status(200).json(expense);
    } catch (error) {
      next(error);
    }
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.expensesService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
