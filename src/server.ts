import './utils/env';
import 'reflect-metadata';
import app from './app';
import Database from './database/connection';

const PORT = process.env.PORT || 3333;

Database.getInstance()
  .connect()
  .then(() => console.log('Connected on Database'))
  .catch(console.error);

app.listen(PORT, () => console.log(`Running server on port ${PORT}`));
