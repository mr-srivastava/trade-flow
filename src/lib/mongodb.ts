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
 * Connect to MongoDB
 * Uses connection caching to prevent multiple connections in serverless environments
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  const cached = getCache();
  
  // Return cached connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create new connection if no cached promise exists
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
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

/**
 * Disconnect from MongoDB
 * Useful for cleanup in serverless environments
 */
export async function disconnectFromDatabase(): Promise<void> {
  const cached = getCache();
  
  if (cached.conn) {
    await cached.conn.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log('📤 Disconnected from MongoDB');
  }
}

/**
 * Check if connected to MongoDB
 */
export function isConnected(): boolean {
  const cached = getCache();
  return cached.conn?.connection.readyState === 1;
}

export default connectToDatabase; 