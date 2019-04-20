import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import recipesController from './recipes';

mongoose
  .connect('mongodb://localhost:27017/loomi-db', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err: any) => console.log(err));

express()
  .use(bodyParser.json())
  .use('/recipes', recipesController)
  .listen(3000, () => console.log('Server running...'));
