import logger from '../utils/logger';
import mongoose from 'mongoose';
import env from './env';

const database = env.application.database;
const mongoConfig = {
  username: database.username,
  password: database.password,
  // It's not recommended to hardcode MongoDB connection URI in the code
  // Better to store complete URI in environment variables
  uri:
    process.env.MONGODB_URI ||
    `mongodb+srv://${database.username}:${database.password}@cluster0.ie7en.mongodb.net/StudyApplication?retryWrites=true&w=majority`
};

const connectDB = async () => {
  try {
    await mongoose.connect(mongoConfig.uri, {
      ssl: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
