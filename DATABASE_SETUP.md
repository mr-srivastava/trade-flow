# Database Migration Guide

This guide explains how to migrate from static `data.ts` and `content.ts` files to a file-based database using `lowdb`.

## Overview

The project has been migrated from static data structures to a dynamic file-based database system that supports:

- ✅ Type-safe database operations
- ✅ CRUD API endpoints for products and content
- ✅ Admin authentication for write operations
- ✅ Data validation with Zod
- ✅ Automatic data migration
- ✅ **Landing component integration with database content**

## Architecture

### Database Layer (`src/lib/db.ts`)
- **Database**: JSON file (`db.json`) managed by lowdb
- **Schema**: TypeScript interfaces for type safety
- **Operations**: CRUD functions with proper error handling
- **Authentication**: Simple bearer token validation for admin operations

### API Routes

#### Products API
- `GET /api/products` - List all products (public)
- `POST /api/products` - Create product (admin only)
- `GET /api/products/[id]` - Get product by ID with related products (public)
- `PUT /api/products/[id]` - Update product (admin only)
- `DELETE /api/products/[id]` - Delete product (admin only)

#### Content API
- `GET /api/content` - Get all page content (public)
- `PUT /api/content` - Update page content (admin only)
- `GET /api/content/[section]` - Get specific content section (public)
- `PUT /api/content/[section]` - Update specific content section (admin only)

Valid content sections: `hero`, `benefits`, `about`, `productCategories`, `synFlowFeatures`, `resourcesData`

### Landing Component Integration

The `src/components/Landing/v2/Landing.tsx` component has been converted from static imports to database-driven content:

**Before:**
```typescript
import { pageContent } from '@/lib/content';

export default function LandingV2() {
  return (
    <div>
      <Hero content={pageContent.hero} />
      <PlatformBenefits benefits={pageContent.benefits} />
      // ... other components
    </div>
  );
}
```

**After:**
```typescript
import { getPageContent } from '@/lib/db';

async function fetchPageContent(): Promise<PageContent> {
  try {
    const content = await getPageContent();
    return content;
  } catch (error) {
    // Fallback to static content
    const { pageContent } = await import('@/lib/content');
    return pageContent;
  }
}

export default async function LandingV2() {
  const content = await fetchPageContent();
  
  return (
    <div>
      <Hero content={content.hero} />
      <PlatformBenefits benefits={content.benefits} />
      // ... other components
    </div>
  );
}
```

**Benefits:**
- ✅ Content can be updated dynamically via API
- ✅ Server-side rendering with fresh data
- ✅ Fallback to static content if database fails
- ✅ Type-safe content structure
- ✅ No breaking changes to existing components

## Migration Process

### 1. Initial Setup
```bash
# Install dependencies (lowdb should already be installed)
npm install

# Reset database (optional)
npm run db:reset
```

### 2. Run Migration
```bash
# Migrate both products and content
npm run migrate

# Alternative manual migration
npm run migrate:manual
```

### 3. Verify Migration
```bash
# Test content API
npm run test:content-api

# Test landing component integration
npm run test:landing-integration
```

## Testing

### Content API Testing
```bash
npm run test:content-api
```

This tests:
- GET endpoints for all content sections
- PUT endpoints with admin authentication
- Error handling for invalid sections
- Content validation

### Landing Component Integration Testing
```bash
npm run test:landing-integration
```

This tests:
- Landing page loads successfully
- Content is fetched from database
- Dynamic content updates via API
- Content restoration
- All content sections are accessible

### Manual Testing

#### Get Content
```bash
# Get all content
curl http://localhost:3000/api/content

# Get specific section
curl http://localhost:3000/api/content/hero
```

#### Update Content (Admin Only)
```bash
# Update hero section
curl -X PUT http://localhost:3000/api/content/hero \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-admin-token-here" \
  -d '{"heading":"New Heading","description":"Updated description"}'

# Update entire content
curl -X PUT http://localhost:3000/api/content \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-admin-token-here" \
  -d '{"hero":{"heading":"Complete Update"}}'
```

## Database Schema

```typescript
interface DatabaseSchema {
  products: Product[]
  total_products: number
  content: PageContent
}

interface PageContent {
  hero: HeroContent
  benefits: Benefit[]
  about: AboutContent
  productCategories: ProductCategoriesContent
  synFlowFeatures: SynFlowFeaturesContent
  resourcesData: ResourcesContent
}
```

## Environment Variables

```bash
# Admin token for write operations
ADMIN_TOKEN=your-admin-token-here

# API URL for production (optional)
NEXT_PUBLIC_API_URL=https://your-domain.com
```

## File Structure

```
├── src/
│   ├── lib/
│   │   ├── db.ts              # Database operations
│   │   ├── data.ts            # Original products data
│   │   ├── content.ts         # Original content data
│   │   └── types.ts           # TypeScript interfaces
│   ├── app/api/
│   │   ├── products/          # Products API routes
│   │   └── content/           # Content API routes
│   └── components/
│       └── Landing/v2/
│           └── Landing.tsx    # Updated Landing component
├── scripts/
│   ├── migrate-data.ts        # Migration script
│   ├── test-content-api.sh    # Content API tests
│   └── test-landing-integration.sh # Landing integration tests
├── db.json                    # Database file
└── DATABASE_SETUP.md          # This file
```

## Troubleshooting

### Common Issues

1. **Migration fails with "Cannot read properties of undefined"**
   - Reset database: `npm run db:reset`
   - Re-run migration: `npm run migrate`

2. **Landing page shows 500 error**
   - Check that content has complete structure
   - Verify hero content has `buttons`, `industries`, and `stats` properties
   - Run: `curl http://localhost:3000/api/content/hero | jq '.'`

3. **Content updates don't appear on landing page**
   - Ensure you're updating the complete content structure
   - Use partial updates carefully to avoid losing required fields
   - Restart development server if needed

4. **API returns 401 Unauthorized**
   - Check Authorization header: `Authorization: Bearer your-admin-token-here`
   - Verify ADMIN_TOKEN environment variable

### Reset and Restore

```bash
# Complete reset
npm run db:reset
npm run migrate

# Test everything
npm run test:content-api
npm run test:landing-integration
```

## Next Steps

1. **Production Deployment**
   - Set up proper JWT authentication
   - Use environment-specific admin tokens
   - Consider database backup strategies

2. **Enhanced Features**
   - Add content versioning
   - Implement content scheduling
   - Add content validation webhooks
   - Create admin dashboard for content management

3. **Performance Optimization**
   - Add Redis caching layer
   - Implement content CDN
   - Add database indexing for large datasets

## Success Criteria

✅ **Migration Complete** - All data migrated from static files to database  
✅ **API Functional** - All CRUD operations working with proper authentication  
✅ **Landing Component Updated** - Fetches content from database with fallback  
✅ **Testing Suite** - Comprehensive tests for API and component integration  
✅ **Documentation** - Complete setup and troubleshooting guide  

The migration is now complete and the Landing component successfully fetches content from the database while maintaining backward compatibility! 