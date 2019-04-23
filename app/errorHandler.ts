import { RequestHandler, ErrorRequestHandler } from 'express';

export const genericErrorHandler: ErrorRequestHandler = (err, req, res, next) =>
  res.status(500).json({ message: err.message });

export const notFoundErrorHandler: RequestHandler = (req, res) =>
  res.status(404).json({ message: 'Endpoint not found.' });
