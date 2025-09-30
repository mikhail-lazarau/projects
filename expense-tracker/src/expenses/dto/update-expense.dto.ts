import Joi from 'joi';

export const updateExpenseSchema = Joi.object({
  name: Joi.string(),
  amount: Joi.number(),
  currency: Joi.string(),
  category: Joi.string(),
  date: Joi.date(),
});

export interface UpdateExpenseDto {
  name?: string;
  amount?: number;
  currency?: string;
  category?: string;
  date?: Date;
}
