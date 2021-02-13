import "reflect-metadata";
import express from 'express';
import './db/connect';
import routes from './routes';

import { Port } from './../config';

const app = express();
const port = Port;

app.use(express.json);
app.use(routes)

app.listen(port, () => { console.log('Running at port: '+port)})