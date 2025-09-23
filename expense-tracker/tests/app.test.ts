import { jest, describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { ExpensesController } from '../src/expenses/expenses.controller.js';
import { ExpensesService } from '../src/expenses/expenses.service.js';
import { ExpensesRepository } from '../src/expenses/expenses.repository.js';
import { Expense } from '../src/expenses/entity/expense.entity.js';

describe('ExpensesController', () => {
  let controller: ExpensesController;
  let expensesService: ExpensesService;

  // jest.mock('../src/expenses/expenses.repository.js', () => ({
  //   findAll: jest.fn(),
  //   create: jest.fn(),
  //   find: jest.fn(),
  // }));

  beforeAll(() => {
    // Create a mock repository
    const mockRepository: jest.Mocked<ExpensesRepository> = {
      findAll: jest.fn(),
      create: jest.fn(),
      find: jest.fn(),
    } as any;

    // Create a real service instance with the mock repository
    expensesService = new ExpensesService(mockRepository);

    // Create the controller with the real service
    controller = new ExpensesController(expensesService);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return a list of expenses and a 200 status code', async () => {
      // Arrange
      const mockExpenses: Expense[] = [
        { id: 1, name: 'Test Expense', amount: 100, currency: 'USD', category: 'Test', date: new Date() },
      ];
      
      // Spy on the findAll method and mock its return value
      const findAllSpy = jest.spyOn(expensesService, 'findAll').mockResolvedValue(mockExpenses);

      const req = getMockReq();
      const { res } = getMockRes();

      // Act
      // @ts-ignore - private method access for testing
      await controller.findAll(req, res);

      // Assert
      expect(findAllSpy).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockExpenses);
    });
  });
});

