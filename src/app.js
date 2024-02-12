import express from 'express';
import cookieParser from 'cookie-parser';

import { resolve } from 'path';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import './config/database.js';
import homeRouter from './routes/homeRoute.js';
import cadastroRouter from './routes/cadastroRoute.js';
import loginRouter from './routes/loginRoute.js';
import perfilRouter from './routes/perfilRoute.js';


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.static(resolve(__dirname, '../public')))


app.use('/', homeRouter);
app.use('/cadastro/', cadastroRouter);
app.use('/login/', loginRouter);
app.use('/perfil/', perfilRouter);


export default app;

