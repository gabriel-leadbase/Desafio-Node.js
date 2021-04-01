import express from 'express';
import swaggerUi from 'swagger-ui-express';
import routes from './routes/index';
import AppError from './errors/AppError';
import documentation from './documentation/openApiDocumentation';
import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.error();
    this.documentation();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  error() {
    this.server.use((error, request, response, next) => {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          status: 'error',
          message: error.message,
        });
      }
      return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    });
  }

  documentation() {
    this.server.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(documentation)
    );
  }
}

export default new App().server;
