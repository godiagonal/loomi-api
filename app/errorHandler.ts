import { RequestHandler } from 'express';

const errorHandler: RequestHandler = (req, res) =>
  res.status(404).json({ message: 'Endpoint not found.' });

export default errorHandler;
