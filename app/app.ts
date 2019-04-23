import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import { apiKeyStrategyCreator, apiKeyStrategyName } from './apiKeyStrategy';
import { genericErrorHandler, notFoundErrorHandler } from './errorHandler';
import recipesController from './recipes';

require('custom-env').env();
const {
  NODE_ENV,
  PORT = 3000,
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PWD,
  API_KEYS = '',
  API_CLIENTS = ''
} = process.env;

console.log(`Starting server, env: ${NODE_ENV}`);

passport.use(
  apiKeyStrategyCreator(API_KEYS.split(','), API_CLIENTS.split(','))
);

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
  .use(morgan('tiny'))
  .use(bodyParser.json())
  .use(passport.authenticate(apiKeyStrategyName, { session: false }))
  .use('/recipes', recipesController)
  .use(genericErrorHandler)
  .use(notFoundErrorHandler)
  .listen(PORT, () => console.log('Server running...'));
