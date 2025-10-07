import winston from 'winston';

export const developmentTransports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.cli(),
      winston.format.splat(),
    ),
  }),
];
