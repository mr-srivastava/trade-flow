import { migrateExistingData, migrateExistingContent } from '../src/lib/db'
import { productsData } from '../src/lib/data'
import { pageContent } from '../src/lib/content'

async function runMigration() {
  try {
    console.log('🚀 Starting migration from data.ts and content.ts to db.json...')
    
    // Migrate products
    console.log(`Found ${productsData.total_products} products to migrate`)
    await migrateExistingData(productsData)
    
    // Migrate content
    console.log('Found page content to migrate')
    await migrateExistingContent(pageContent)
    
    console.log('✅ Migration completed successfully!')
    console.log('📊 Database is now ready to use with the API routes')
    console.log('🔹 Products API: /api/products')
    console.log('🔹 Content API: /api/content')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

runMigration() 