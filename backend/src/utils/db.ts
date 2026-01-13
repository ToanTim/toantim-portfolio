import mongoose from 'mongoose';
import {Project} from '../models/project';
// 1. This small function decides which database connection string (URI) to use
const getMongoUri = (): string => {
  const env = process.env.NODE_ENV;   // ← reads NODE_ENV (most important part!)

  // In production → must use cloud database (Atlas)
  console.log(`[MongoDB] Current NODE_ENV: ${env}`);
  if (env === 'production') {
    if (!process.env.MONGODB_URI) {                    // ← safety check
      throw new Error('MONGODB_URI is required in production!');
    }
    console.log('[MongoDB] 🚀 PRODUCTION MODE → Connecting to MongoDB Atlas (Cloud)');
    return process.env.MONGODB_URI;                   // ← returns Atlas URI
  }

  // In development (or any other env) → use local database
  const localUri = process.env.MONGODB_URI_LOCAL 
                || 'mongodb://localhost:27017/portfolio-dev';   // ← fallback to default local

  console.log('[MongoDB] 💻 DEVELOPMENT MODE → Connecting to Local MongoDB');
  console.log(`[MongoDB] URI: ${localUri}`);
  return localUri;
};

// 2. The actual connection function (called once when server starts)
let isConnected = false;   // ← remembers if we already connected (very important!)

export async function connectDB(): Promise<typeof mongoose> {
  
  // Optimization: don't connect again if already connected
  if (isConnected) {
    console.log('[MongoDB] Already connected');
    return mongoose;
  }

  try {
    const uri = getMongoUri();          // ← here it decides local OR cloud

    // Actually connects using modern safe options
    await mongoose.connect(uri, {
      maxPoolSize: 10,                  // ← limits number of connections (good for performance)
      serverSelectionTimeoutMS: 5000,   // ← fails faster if database is down
      socketTimeoutMS: 45000,
      family: 4                         // ← prefers IPv4 (many hosting providers recommend this)
    });

    isConnected = true;
    const dbName = mongoose.connection.name;
    const env = process.env.NODE_ENV || 'development';
    console.log(`[MongoDB] ✅ Connected successfully to ${dbName} (${env.toUpperCase()})`);

    // Bonus: if connection drops later → we notice it
    mongoose.connection.on('error', (err) => {
      console.error('[MongoDB] Connection error:', err);
      isConnected = false;   // ← next time we will try to reconnect
    });

    // Optional: Ensure collections & indexes exist
  try {
    await Project.createIndexes();   // if you have Project model
    console.log('[MongoDB] Indexes created/verified for all models');
  } catch (err) {
    console.warn('[MongoDB] Could not create indexes:', err);
  }

    return mongoose;
  } catch (error) {
    console.error('[MongoDB] Connection failed:', error);
    throw error;   // ← server should probably crash if DB connection fails
  }
}
// Optional: helper to check current environment
export const isProduction = () => process.env.NODE_ENV === 'production';