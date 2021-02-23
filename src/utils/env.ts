import { join } from 'path';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';

dotenv.config();

const envPath =
  process.env.NODE_ENV === 'testing'
    ? join(__dirname, '..', '..', '.env.testing')
    : join(__dirname, '..', '..', '.env');

const envConfig = dotenv.parse(readFileSync(envPath));

for (const k in envConfig) {
  process.env[k] = envConfig[k];
}
