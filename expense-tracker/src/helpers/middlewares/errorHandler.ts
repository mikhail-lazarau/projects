/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../Exception.js';
import logger from '../Logger.js';

export const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  logger.error(
    `[${status}] - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
  );

  res.status(status).json({ status, message });
};
