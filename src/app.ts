import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import env from './config/env';
import logger from './utils/logger';
import connectDB from './config/database';

const app = express();
const PORT = env.application.port;
connectDB();
app.get('/', (req, res) => {
  res.send('welcome to My study application backend');
});

export default function start() {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
}
