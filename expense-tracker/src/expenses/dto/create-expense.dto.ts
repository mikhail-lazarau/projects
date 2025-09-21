import { Expense } from '../entity/expense.entity';

export type CreateExpenseDto = Omit<Expense, 'id'>;
