import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import recipesController from './recipes';

mongoose
  .connect('mongodb://localhost:27017/loomi-db', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err: any) => console.log(err));

express()
  .use(bodyParser.json())
  .use(morgan('tiny'))
  .use('/recipes', recipesController)
  .use((req, res) => res.status(404).json({ message: 'Endpoint not found.' }))
  .listen(3000, () => console.log('Server running...'));
