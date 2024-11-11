import * as dotenv from 'dotenv';

dotenv.config();

export default {
  application: {
    port: process.env.PORT || 3500,
    database: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    }
  }
};
