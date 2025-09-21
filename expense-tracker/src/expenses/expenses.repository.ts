import db from '../db/db.service';
import { Expense } from './entity/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';

export class ExpensesRepository {
  public create(dto: CreateExpenseDto): Expense {
    const { name, amount, currency, category, date } = dto;
    const stmt = db.prepare(
      'INSERT INTO expenses (name, amount, currency, category, date) VALUES (?, ?, ?, ?, ?)',
    );
    const info = stmt.run(name, amount, currency, category, date);

    return this.find(info.lastInsertRowid as number);
  }

  public findAll(): Expense[] {
    const stmt = db.prepare('SELECT * FROM expenses');
    return stmt.all() as Expense[];
  }

  public find(id: number): Expense {
    const stmt = db.prepare('SELECT * FROM expenses WHERE id = ?');
    return stmt.get(id) as Expense;
  }
}
