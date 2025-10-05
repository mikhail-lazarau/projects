import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { HttpException } from '../Exception.js';

export const validationMiddleware = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      throw new HttpException(400, error.details[0].message);
    }

    next();
  };
};
