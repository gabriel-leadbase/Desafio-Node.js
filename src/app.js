import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
