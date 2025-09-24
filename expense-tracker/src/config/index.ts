import dotenv from 'dotenv';

dotenv.config();

const normalizePort = (val: string) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const config = {
  port: normalizePort(process.env.PORT || '8080'),
  databaseUrl: process.env.DATABASE_URL || '',
};

export default config;
