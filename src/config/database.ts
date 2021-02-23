import { ConnectionOptions } from 'typeorm';

const options: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST as string,
  port: (process.env.DB_PORT as unknown) as number,
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSW as string,
  database: process.env.DB_DATABASE as string,
  entities: ['./src/app/models/*.ts']
};

export default options;
