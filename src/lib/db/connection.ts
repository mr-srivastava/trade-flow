import mongoose from 'mongoose';

// MongoDB connection string - resolved dynamically to ensure env vars are loaded
function getMongoDBURI(): string {
  return process.env.MONGODB_URI || 'mongodb://localhost:27017/trade-flow';
}

// Connection cache interface
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Global connection cache to prevent multiple connections
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

// Initialize global mongoose cache
function getCache(): MongooseCache {
  if (!globalThis.mongooseCache) {
    globalThis.mongooseCache = { conn: null, promise: null };
  }
  return globalThis.mongooseCache;
}

/**
 * Ensure database connection is established
 * Reuses existing connection caching mechanism for serverless environments
 * This function should be called by repositories before performing database operations
 */
export async function ensureConnection(): Promise<typeof mongoose> {
  const cached = getCache();

  // Return cached connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create new connection if no cached promise exists
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10, // Connection pooling with max 10 connections
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
    };

    cached.promise = mongoose.connect(getMongoDBURI(), opts);
  }

  try {
    cached.conn = await cached.promise;
    console.log('✅ Connected to MongoDB');
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}
