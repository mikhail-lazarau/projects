import Joi from 'joi';

export const createExpenseSchema = Joi.object({
  name: Joi.string().required(),
  amount: Joi.number().required(),
  currency: Joi.string().required(),
  category: Joi.string().required(),
  date: Joi.date().required(),
});

export interface CreateExpenseDto {
  name: string;
  amount: number;
  currency: string;
  category: string;
  date: Date;
}
