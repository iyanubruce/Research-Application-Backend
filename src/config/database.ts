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
    `mongodb+srv://${database.username}:${database.password}@cluster0.ie7en.mongodb.net/ResearchDatabase?retryWrites=true&w=majority&appName=Cluster0`
};
const connectDB = async () => {
  try {
    await mongoose.connect(mongoConfig.uri);
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
