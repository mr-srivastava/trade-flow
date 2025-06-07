# MongoDB Setup Guide

This guide explains how to set up MongoDB connection for your Trade Flow application.

## Prerequisites

1. **MongoDB Installation**:
   - **Local Development**: Install MongoDB Community Edition
   - **Cloud**: Create a MongoDB Atlas account (recommended for production)

2. **Dependencies**: Already installed
   - `mongoose` - MongoDB ODM for Node.js
   - `@types/mongoose` - TypeScript definitions

## Setup Steps

### 1. Environment Variables

Create a `.env.local` file in your project root and add:

```bash
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/trade-flow

# For MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/trade-flow?retryWrites=true&w=majority

# Admin token (keep existing)
ADMIN_TOKEN=your-admin-token-here
```

### 2. MongoDB Atlas Setup (Recommended for Production)

1. **Create Account**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Create Cluster**: 
   - Choose a free tier cluster
   - Select your preferred region
3. **Create Database User**:
   - Go to Database Access
   - Add a new database user with read/write permissions
4. **Whitelist IP Address**:
   - Go to Network Access
   - Add your IP address (or 0.0.0.0/0 for all IPs in development)
5. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

### 3. Local MongoDB Setup

If using local MongoDB:

```bash
# Install MongoDB Community Edition
# macOS with Homebrew:
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb/brew/mongodb-community

# Or start manually:
mongod --config /usr/local/etc/mongod.conf
```

### 4. Migration from JSON to MongoDB

Run the migration script to transfer your existing data:

```bash
# Add migration script to package.json
npm run migrate:mongodb

# Or run directly:
npx tsx scripts/migrate-to-mongodb.ts
```

### 5. Update API Routes

Your API routes need to be updated to use MongoDB functions. Here's how to modify them:

#### Update Products API

Replace imports in your API routes:

```typescript
// Before (src/app/api/products/route.ts)
import { getAllProducts, addProduct } from '@/lib/db';

// After
import { getAllProducts, addProduct } from '@/lib/mongodb-db';
```

#### Update Content API

```typescript
// Before (src/app/api/content/route.ts)
import { getPageContent, updatePageContent } from '@/lib/db';

// After
import { getPageContent, updatePageContent } from '@/lib/mongodb-db';
```

### 6. Test the Connection

Add a test script to verify your MongoDB connection:

```typescript
// scripts/test-mongodb.ts
import { connectToDatabase, isConnected } from '../src/lib/mongodb';

async function testConnection() {
  try {
    await connectToDatabase();
    console.log('✅ MongoDB connection test successful');
    console.log('Connected:', isConnected());
  } catch (error) {
    console.error('❌ MongoDB connection test failed:', error);
  }
}

testConnection();
```

## File Structure

```
├── src/
│   ├── lib/
│   │   ├── mongodb.ts         # MongoDB connection setup
│   │   ├── models.ts          # Mongoose models
│   │   ├── mongodb-db.ts      # MongoDB database operations
│   │   ├── db.ts              # Original JSON database (keep as backup)
│   │   └── types.ts           # TypeScript interfaces
├── scripts/
│   ├── migrate-to-mongodb.ts  # Migration script
│   └── test-mongodb.ts        # Connection test
├── .env.local                 # Environment variables
└── MONGODB_SETUP.md          # This file
```

## Key Features

### Connection Management
- **Connection Caching**: Prevents multiple connections in serverless environments
- **Error Handling**: Graceful connection failure handling
- **TypeScript Support**: Full type safety with Mongoose

### Data Models
- **Product Model**: Complete product schema with validation
- **Content Model**: Page content with nested schemas
- **Automatic Timestamps**: Created/updated timestamps
- **Transform Functions**: Consistent API response format

### Database Operations
- **CRUD Operations**: Create, Read, Update, Delete for products
- **Content Management**: Page content operations
- **Search Functionality**: Text search across products
- **Migration Support**: Easy data migration from JSON

## Environment-Specific Configuration

### Development
```bash
MONGODB_URI=mongodb://localhost:27017/trade-flow-dev
```

### Production
```bash
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/trade-flow-prod
```

### Testing
```bash
MONGODB_URI=mongodb://localhost:27017/trade-flow-test
```

## Common Issues & Solutions

### 1. Connection Timeout
```
Error: MongooseServerSelectionError: connect ECONNREFUSED
```
**Solution**: Check if MongoDB service is running locally or verify Atlas connection string.

### 2. Authentication Failed
```
Error: Authentication failed
```
**Solution**: Verify database user credentials in MongoDB Atlas.

### 3. Network Access
```
Error: connection attempt failed
```
**Solution**: Check IP whitelist in MongoDB Atlas Network Access.

### 4. Missing Environment Variables
```
Error: MONGODB_URI is not defined
```
**Solution**: Ensure `.env.local` file exists with correct variables.

## Performance Optimization

### Indexing
Add indexes for better query performance:

```typescript
// In your models
ProductSchema.index({ name: 1 });
ProductSchema.index({ slug_name: 1 });
ProductSchema.index({ industries: 1 });
```

### Connection Pooling
The connection is configured with optimal pool settings:
- `maxPoolSize: 10` - Maximum 10 concurrent connections
- `serverSelectionTimeoutMS: 5000` - 5-second timeout
- `socketTimeoutMS: 45000` - 45-second socket timeout

## Migration Back to JSON (if needed)

If you need to revert to JSON database:

1. Export data from MongoDB:
   ```bash
   npx tsx scripts/export-mongodb-to-json.ts
   ```

2. Update API routes to use original `@/lib/db` imports

3. Remove MongoDB dependencies:
   ```bash
   npm uninstall mongoose @types/mongoose
   ```

## Next Steps

1. **Test Thoroughly**: Run all your existing tests
2. **Update Documentation**: Update any API documentation
3. **Monitor Performance**: Use MongoDB Atlas monitoring
4. **Backup Strategy**: Set up regular backups
5. **Scaling**: Consider read replicas for high traffic

## Support

- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com/
- **Mongoose Docs**: https://mongoosejs.com/docs/
- **MongoDB Node.js Driver**: https://mongodb.github.io/node-mongodb-native/ 