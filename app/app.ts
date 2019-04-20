import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import recipesController from './recipes';
import errorHandler from './errorHandler';

const {
  PORT = 3000,
  DB_HOST = 'localhost:27017',
  DB_NAME = 'loomi-db'
} = process.env;

mongoose
  .connect(`mongodb://${DB_HOST}/${DB_NAME}`, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err: any) => console.log(err));

express()
  .use(bodyParser.json())
  .use(morgan('tiny'))
  .use('/recipes', recipesController)
  .use(errorHandler)
  .listen(PORT, () => console.log('Server running...'));
