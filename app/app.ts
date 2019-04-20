import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import recipesController from './recipes';
import errorHandler from './errorHandler';

mongoose
  .connect('mongodb://localhost:27017/loomi-db', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err: any) => console.log(err));

express()
  .use(bodyParser.json())
  .use(morgan('tiny'))
  .use('/recipes', recipesController)
  .use(errorHandler)
  .listen(process.env.PORT || 3000, () => console.log('Server running...'));
