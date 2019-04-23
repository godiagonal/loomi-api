import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { genericErrorHandler, notFoundErrorHandler } from './errorHandler';
import recipesController from './recipes';

require('custom-env').env();
const { PORT = 3000, DB_HOST, DB_NAME, DB_USER, DB_PWD } = process.env;

mongoose
  .connect(`mongodb://${DB_HOST}/${DB_NAME}`, {
    auth: {
      authSource: 'admin'
    },
    user: DB_USER,
    pass: DB_PWD,
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err: any) => console.log(err));

express()
  .use(bodyParser.json())
  .use(morgan('tiny'))
  .use('/recipes', recipesController)
  .use(genericErrorHandler)
  .use(notFoundErrorHandler)
  .listen(PORT, () => console.log('Server running...'));
