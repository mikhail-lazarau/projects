import winston from 'winston';
import config from '../config/index.js';
import { developmentTransports } from '../config/logger/development.js';
import { productionTransports } from '../config/logger/production.js';

const transports =
  config.NODE_ENV === 'development'
    ? developmentTransports
    : productionTransports;

const logger = winston.createLogger({
  level: 'info',
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
  ),
  transports,
});

export default logger;
