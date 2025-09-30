import { PrismaClient } from '@prisma/client';
import { CreateExpenseDto } from './dto/create-expense.dto.js';
import { GetExpensesDto } from './dto/get-expenses.dto.js';
import { UpdateExpenseDto } from './dto/update-expense.dto.js';

const prisma = new PrismaClient();

export class ExpensesRepository {
  public create = async (dto: CreateExpenseDto) => {
    return prisma.expense.create({ data: dto });
  };

  public findAll = async (dto: GetExpensesDto) => {
    const { limit, offset, fromDate, toDate } = dto;

    // See the Prisma documentation for more information on these parameters:
    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#findmany
    //
    // The where.date condition filters expenses where the date is on/after fromDate
    // and on/before toDate.
    //
    // The gte (greater than or equal) condition filters expenses where the date is on/after fromDate.
    // The lte (less than or equal) condition filters expenses where the date is on/before toDate.

    return prisma.expense.findMany({
      take: limit,
      skip: offset,
      where: {
        date: {
          gte: fromDate ? new Date(fromDate) : undefined,
          lte: toDate ? new Date(toDate) : undefined,
        },
      },
    });
  };

  public find = async (id: number) => {
    return prisma.expense.findUnique({ where: { id } });
  };

  public update = async (id: number, dto: UpdateExpenseDto) => {
    return prisma.expense.update({
      where: { id },
      data: dto,
    });
  };
}
