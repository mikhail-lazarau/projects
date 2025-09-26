import { PrismaClient } from '@prisma/client';
import { CreateExpenseDto } from './dto/create-expense.dto.js';

const prisma = new PrismaClient();

export class ExpensesRepository {
  public create = async (dto: CreateExpenseDto) => {
    return prisma.expense.create({ data: dto });
  };

  public findAll = async () => {
    return prisma.expense.findMany();
  };

  public find = async (id: number) => {
    return prisma.expense.findUnique({ where: { id } });
  };
}
