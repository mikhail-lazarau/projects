import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from '@jest/globals';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { ExpensesController } from '../src/expenses/expenses.controller.js';
import { ExpensesService } from '../src/expenses/expenses.service.js';
import { ExpensesRepository } from '../src/expenses/expenses.repository.js';
import { Expense } from '../src/expenses/entity/expense.entity.js';

describe('ExpensesController', () => {
  let controller: ExpensesController;
  let expensesService: ExpensesService;

  beforeEach(() => {
    const mockRepository =
      new ExpensesRepository() as jest.Mocked<ExpensesRepository>;
    expensesService = new ExpensesService(mockRepository);
    controller = new ExpensesController(expensesService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('findAll', () => {
    it('should return a list of expenses and a 200 status code', async () => {
      const mockExpenses: Expense[] = [
        {
          id: 1,
          name: 'Test Expense',
          amount: 100,
          currency: 'USD',
          category: 'Test',
          date: new Date(),
        },
      ];

      const findAllSpy = jest
        .spyOn(expensesService, 'findAll')
        .mockResolvedValue(mockExpenses);

      const req = getMockReq();
      const { res } = getMockRes();

      // @ts-expect-error - private method access for testing
      await controller.findAll(req, res);

      expect(findAllSpy).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockExpenses);
    });

    it('should pass query parameters to the service layer', async () => {
      const mockExpenses: Expense[] = [
        {
          id: 1,
          name: 'Test Expense',
          amount: 100,
          currency: 'USD',
          category: 'Test',
          date: new Date(),
        },
      ];

      const findAllSpy = jest
        .spyOn(expensesService, 'findAll')
        .mockResolvedValue(mockExpenses);

      const query = {
        limit: '10',
        offset: '0',
        fromDate: '2024-01-01',
        toDate: '2024-12-31',
      };

      const req = getMockReq({ query });
      const { res } = getMockRes();

      // @ts-expect-error - private method access for testing
      await controller.findAll(req, res);

      expect(findAllSpy).toHaveBeenCalledWith({
        limit: 10,
        offset: 0,
        fromDate: '2024-01-01',
        toDate: '2024-12-31',
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockExpenses);
    });
  });
});
