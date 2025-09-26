import { ExpensesRepository } from './expenses.repository.js';
import { CreateExpenseDto } from './dto/create-expense.dto.js';
import { GetExpensesDto } from './dto/get-expenses.dto.js';
import { HttpException } from '../helpers/Exception.js';

export class ExpensesService {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  public create = async (dto: CreateExpenseDto) => {
    return this.expensesRepository.create(dto);
  };

  public findAll = async (dto: GetExpensesDto) => {
    return this.expensesRepository.findAll(dto);
  };

  public async find(id: number) {
    const expense = await this.expensesRepository.find(id);
    if (!expense) {
      throw new HttpException(404, 'Expense not found');
    }
    return expense;
  }
}
