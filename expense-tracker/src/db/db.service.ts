import Database from 'better-sqlite3';
import config from '../config/index.js';

const db = new Database(config.databaseUrl, {
  fileMustExist: false,
});

const createSchema = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      amount REAL NOT NULL,
      currency TEXT NOT NULL,
      category TEXT NOT NULL,
      date DATETIME NOT NULL
    );
  `);
};

export const initDatabase = () => {
  createSchema();
};

export default db;
