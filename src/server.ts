import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import './database/connect';
import routes from './routes';
import 'express-async-errors';
import AppError from './errors/Error';

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
  if(err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    })
  }

  return response.status(500).json({
    status: "Error",
    message: `Internal server error ${err.message}`
  })
});

app.listen(3000, () => console.log('Server is running in http://localhost:3000'));

