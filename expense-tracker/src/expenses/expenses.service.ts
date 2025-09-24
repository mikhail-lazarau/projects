import { ExpensesRepository } from './expenses.repository.js';
import { CreateExpenseDto } from './dto/create-expense.dto.js';

export class ExpensesService {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  public create = async (dto: CreateExpenseDto) => {
    return this.expensesRepository.create(dto);
  };

  public findAll = async () => {
    return this.expensesRepository.findAll();
  };

  public async find(id: number) {
    return this.expensesRepository.find(id);
  }
}
