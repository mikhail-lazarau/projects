import { Router, Request, Response } from 'express';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';

export class ExpensesController {
  public router = Router();

  constructor(private readonly expensesService: ExpensesService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', this.create);
    this.router.get('/', this.findAll);
  }

  private create = (req: Request, res: Response) => {
    const expense = this.expensesService.create(req.body as CreateExpenseDto);
    res.status(201).json(expense);
  };

  private findAll = (req: Request, res: Response) => {
    const expenses = this.expensesService.findAll();
    res.status(200).json(expenses);
  };
}
