import { Expense } from '../entity/expense.entity.js';

export type CreateExpenseDto = Omit<Expense, 'id'>;
