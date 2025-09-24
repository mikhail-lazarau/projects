import { ExpensesRepository } from './expenses.repository.js';
import { CreateExpenseDto } from './dto/create-expense.dto.js';

export class ExpensesService {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  public create(dto: CreateExpenseDto) {
    return this.expensesRepository.create(dto);
  }

  public findAll() {
    return this.expensesRepository.findAll();
  }
}
