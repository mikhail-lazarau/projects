import { start } from './app.js';
import { initDatabase } from './db/db.service.js';

initDatabase();
start();
