import express from 'express';
import cors from 'cors';

import Connection from '../core/mysql-database/connection';

import '../core/dependency';
import databaseConfig from './config/database';
import apiRouter from './router.js';

if (!Connection.getInstance(databaseConfig)) {
    throw new Error('Cannot initialize database.');
}

const app = express();

app.use(cors());
app.use('/api', apiRouter);

export default app;
