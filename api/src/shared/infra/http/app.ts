import dotenv from 'dotenv';

dotenv.config();

import '../../../shared/infra/mongodb';

import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';

import { routes } from './routes';
import { AppError } from '../../error/AppError';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use((
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  return response.status(500).json({
    message: error.message,
  });
});

export { server };
