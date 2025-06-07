#!/usr/bin/env tsx

import { config } from 'dotenv';
import { connectToDatabase, isConnected, disconnectFromDatabase } from '../src/lib/mongodb';

// Load environment variables from .env.local
config({ path: '.env.local' });

async function testMongoDBConnection() {
  try {
    console.log('🔌 Testing MongoDB Atlas connection...');
    console.log('🔗 MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
    console.log('📝 Full URI:', process.env.MONGODB_URI);
    console.log('');
    
    // Test connection
    console.log('📡 Connecting to MongoDB Atlas...');
    await connectToDatabase();
    
    if (isConnected()) {
      console.log('✅ Successfully connected to MongoDB Atlas!');
      console.log('🎯 Connection Status:', isConnected() ? 'Connected' : 'Disconnected');
      
      console.log('');
      console.log('✨ All tests passed! Your MongoDB Atlas connection is ready.');
      console.log('');
      console.log('Next steps:');
      console.log('1. Run: npm run migrate:mongodb');
      console.log('2. Update your API routes to use MongoDB');
      console.log('3. Test your application');
      
    } else {
      console.log('❌ Connection failed - not connected');
    }
    
  } catch (error) {
    console.error('❌ MongoDB connection test failed:');
    console.error(error);
    
    // Provide helpful troubleshooting
    console.log('');
    console.log('🔧 Troubleshooting tips:');
    console.log('1. Check your MONGODB_URI in .env.local');
    console.log('2. Verify your MongoDB Atlas credentials');
    console.log('3. Ensure your IP is whitelisted in MongoDB Atlas');
    console.log('4. Check if your cluster is running');
    
  } finally {
    // Clean disconnect
    await disconnectFromDatabase();
    console.log('');
    console.log('👋 Disconnected from MongoDB');
  }
}

// Run the test
testMongoDBConnection(); 