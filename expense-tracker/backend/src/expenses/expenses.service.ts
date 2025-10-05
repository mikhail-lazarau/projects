import { ExpensesRepository } from './expenses.repository.js';
import { CreateExpenseDto } from './dto/create-expense.dto.js';
import { GetExpensesDto } from './dto/get-expenses.dto.js';
import { UpdateExpenseDto } from './dto/update-expense.dto.js';
import { HttpException } from '../helpers/Exception.js';
import logger from '../helpers/Logger.js';

export class ExpensesService {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  public create = async (dto: CreateExpenseDto) => {
    const newExpense = await this.expensesRepository.create(dto);
    logger.info('Expense created', { newExpense });
    return newExpense;
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

  public update = async (id: number, dto: UpdateExpenseDto) => {
    const expense = await this.expensesRepository.find(id);
    if (!expense) {
      throw new HttpException(404, 'Expense not found');
    }
    const updatedExpense = await this.expensesRepository.update(id, dto);
    logger.info(`Expense with id ${id} updated`, { updatedExpense });
    return updatedExpense;
  };

  public delete = async (id: number) => {
    const expense = await this.expensesRepository.find(id);
    if (!expense) {
      throw new HttpException(404, 'Expense not found');
    }
    const deletedExpense = await this.expensesRepository.delete(id);
    logger.info(`Expense deleted`, { deletedExpense });
    return deletedExpense;
  };
}
