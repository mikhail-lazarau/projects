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
import { HttpException } from '../src/helpers/Exception.js';

describe('ExpensesController', () => {
  const mockExpense: Readonly<Expense> = {
    id: 1,
    name: 'Test Expense',
    amount: 100,
    currency: 'USD',
    category: 'Test',
    date: new Date('2025-09-26T10:00:00.000Z'),
  };
  let controller: ExpensesController;
  let expensesService: ExpensesService;
  let mockRepository: jest.Mocked<ExpensesRepository>;

  beforeEach(() => {
    mockRepository =
      new ExpensesRepository() as jest.Mocked<ExpensesRepository>;
    expensesService = new ExpensesService(mockRepository);
    controller = new ExpensesController(expensesService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('find', () => {
    it('should return an expense and a 200 status code', async () => {
      const findSpy = jest
        .spyOn(expensesService, 'find')
        .mockResolvedValue(mockExpense);

      const req = getMockReq({ params: { id: '1' } });
      const { res } = getMockRes();

      // @ts-expect-error - private method access for testing
      await controller.find(req, res);

      expect(findSpy).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockExpense);
    });

    it('should call the next function with an error if expense is not found', async () => {
      const notFoundError = new HttpException(404, 'Expense not found');
      jest.spyOn(expensesService, 'find').mockRejectedValue(notFoundError);

      const req = getMockReq({ params: { id: '-1' } });
      const { res, next } = getMockRes();

      // @ts-expect-error - private method access for testing
      await controller.find(req, res, next);

      expect(next).toHaveBeenCalledWith(notFoundError);
    });
  });

  describe('findAll', () => {
    it('should return a list of expenses and a 200 status code', async () => {
      const mockExpenses: Expense[] = [mockExpense];

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
      const mockExpenses: Expense[] = [mockExpense];

      const findAllSpy = jest
        .spyOn(expensesService, 'findAll')
        .mockResolvedValue(mockExpenses);

      const query = {
        limit: '10',
        offset: '0',
        fromDate: '2025-01-01',
        toDate: '2025-12-31',
      };

      const req = getMockReq({ query });
      const { res } = getMockRes();

      // @ts-expect-error - private method access for testing
      await controller.findAll(req, res);

      expect(findAllSpy).toHaveBeenCalledWith({
        limit: 10,
        offset: 0,
        fromDate: '2025-01-01',
        toDate: '2025-12-31',
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockExpenses);
    });
  });

  describe('update', () => {
    it('should return the updated expense and a 200 status code', async () => {
      const updatedExpense: Expense = {
        ...mockExpense,
        name: 'Updated Expense',
      };

      const updateSpy = jest
        .spyOn(mockRepository, 'update')
        .mockResolvedValue(updatedExpense);

      const req = getMockReq({
        params: { id: '1' },
        body: { name: 'Updated Expense' },
      });
      const { res, next } = getMockRes();

      // @ts-expect-error - private method access for testing
      await controller.update(req, res, next);

      expect(updateSpy).toHaveBeenCalledWith(1, { name: 'Updated Expense' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedExpense);
    });

    it('should call the next function with an error if expense is not found', async () => {
      const notFoundError = new HttpException(404, 'Expense not found');
      const findSpy = jest
        .spyOn(mockRepository, 'find')
        .mockResolvedValue(null);

      const req = getMockReq({
        params: { id: '-1' },
        body: { name: 'Updated Expense' },
      });
      const { res, next } = getMockRes();

      // @ts-expect-error - private method access for testing
      await controller.update(req, res, next);

      expect(findSpy).toHaveBeenCalledWith(-1);
      expect(next).toHaveBeenCalledWith(notFoundError);
    });
  });

  describe('delete', () => {
    it('should return a 204 status code on successful deletion', async () => {
      const deleteSpy = jest
        .spyOn(expensesService, 'delete')
        .mockResolvedValue(undefined as unknown as Expense);

      const req = getMockReq({ params: { id: '1' } });
      const { res, next } = getMockRes();

      // @ts-expect-error - private method access for testing
      await controller.delete(req, res, next);

      expect(deleteSpy).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('should call the next function with an error if expense is not found', async () => {
      const notFoundError = new HttpException(404, 'Expense not found');
      jest.spyOn(expensesService, 'delete').mockRejectedValue(notFoundError);

      const req = getMockReq({ params: { id: '-1' } });
      const { res, next } = getMockRes();

      // @ts-expect-error - private method access for testing
      await controller.delete(req, res, next);

      expect(next).toHaveBeenCalledWith(notFoundError);
    });
  });
});
