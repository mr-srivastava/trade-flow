import { JSONFile } from 'lowdb/node'
import { Low } from 'lowdb'
import path from 'path'
import { ProductsResponse, Product, PageContent } from './types'

// Database schema interface
export interface DatabaseSchema {
  products: Product[]
  total_products: number
  content: PageContent
}

// Default data for the database
const defaultData: DatabaseSchema = {
  products: [],
  total_products: 0,
  content: {
    hero: {
      heading: '',
      description: '',
      industries: [],
      buttons: { contact: { text: '', href: '' }, explore: { text: '', href: '' } },
      stats: { title: '', items: [] }
    },
    benefits: [],
    about: {
      header: { title: '', subtitle: '' },
      description: { paragraphs: [], links: [] },
      values: []
    },
    productCategories: { title: '', subtitle: '', buttonText: '' },
    synFlowFeatures: {
      features: [],
      sectionId: '',
      sectionTitle: '',
      sectionDescription: '',
      learnMoreText: '',
      learnMoreLink: ''
    },
    resourcesData: { title: '', subtitle: '', resources: [] }
  }
}

// Database instance
let db: Low<DatabaseSchema> | null = null

// Initialize the database
export async function initializeDatabase(): Promise<Low<DatabaseSchema>> {
  if (db) return db

  // Use absolute path to the db.json file in the project root
  const dbPath = path.resolve(process.cwd(), 'db.json')
  
  // Create adapter and database instance
  const adapter = new JSONFile<DatabaseSchema>(dbPath)
  db = new Low(adapter, defaultData)

  // Read data from JSON file
  await db.read()

  // If file is empty or doesn't exist, write default data
  if (!db.data) {
    db.data = defaultData
    await db.write()
  }

  // Handle schema migration - add content field if it doesn't exist
  if (!db.data.content) {
    db.data.content = defaultData.content
    await db.write()
    console.log('Database schema updated: added content field')
  }

  return db
}

// Get all products
export async function getAllProducts(): Promise<ProductsResponse> {
  const database = await initializeDatabase()
  await database.read()
  
  return {
    products: database.data.products,
    total_products: database.data.total_products
  }
}

// Add a new product
export async function addProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
  const database = await initializeDatabase()
  await database.read()
  
  // Generate new product with ID and timestamps
  const newProduct: Product = {
    ...product,
    id: generateId(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  
  // Add to products array
  database.data.products.push(newProduct)
  database.data.total_products = database.data.products.length
  
  // Write to file
  await database.write()
  
  return newProduct
}

// Update an existing product
export async function updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'created_at'>>): Promise<Product | null> {
  const database = await initializeDatabase()
  await database.read()
  
  const productIndex = database.data.products.findIndex((p: Product) => p.id === id)
  if (productIndex === -1) return null
  
  // Update the product
  database.data.products[productIndex] = {
    ...database.data.products[productIndex],
    ...updates,
    updated_at: new Date().toISOString()
  }
  
  await database.write()
  return database.data.products[productIndex]
}

// Delete a product
export async function deleteProduct(id: string): Promise<boolean> {
  const database = await initializeDatabase()
  await database.read()
  
  const initialLength = database.data.products.length
  database.data.products = database.data.products.filter((p: Product) => p.id !== id)
  
  if (database.data.products.length !== initialLength) {
    database.data.total_products = database.data.products.length
    await database.write()
    return true
  }
  
  return false
}

// Get product by ID
export async function getProductById(id: string): Promise<Product | null> {
  const database = await initializeDatabase()
  await database.read()
  
  return database.data.products.find((p: Product) => p.id === id) || null
}

// === CONTENT OPERATIONS ===

// Get all content
export async function getPageContent(): Promise<PageContent> {
  const database = await initializeDatabase()
  await database.read()
  
  return database.data.content
}

// Update content
export async function updatePageContent(updates: Partial<PageContent>): Promise<PageContent> {
  const database = await initializeDatabase()
  await database.read()
  
  // Deep merge the updates with existing content
  database.data.content = {
    ...database.data.content,
    ...updates,
    hero: updates.hero ? { ...database.data.content.hero, ...updates.hero } : database.data.content.hero,
    about: updates.about ? { ...database.data.content.about, ...updates.about } : database.data.content.about,
    productCategories: updates.productCategories ? { ...database.data.content.productCategories, ...updates.productCategories } : database.data.content.productCategories,
    synFlowFeatures: updates.synFlowFeatures ? { ...database.data.content.synFlowFeatures, ...updates.synFlowFeatures } : database.data.content.synFlowFeatures,
    resourcesData: updates.resourcesData ? { ...database.data.content.resourcesData, ...updates.resourcesData } : database.data.content.resourcesData
  }
  
  await database.write()
  return database.data.content
}

// Update specific content section
export async function updateContentSection<K extends keyof PageContent>(
  section: K, 
  data: PageContent[K]
): Promise<PageContent> {
  const database = await initializeDatabase()
  await database.read()
  
  database.data.content[section] = data
  await database.write()
  
  return database.data.content
}

// Simple ID generator (in production, consider using uuid)
function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
}

// Admin authentication helper
export function isAuthorizedAdmin(authHeader: string | null): boolean {
  if (!authHeader) return false
  
  // Simple bearer token check - in production, use proper JWT or secure tokens
  const token = authHeader.replace('Bearer ', '')
  const adminToken = process.env.ADMIN_TOKEN || 'your-admin-token-here'
  
  return token === adminToken
}

// Helper function to migrate existing data from data.ts
export async function migrateExistingData(productsData: ProductsResponse): Promise<void> {
  const database = await initializeDatabase()
  
  // Only migrate if database is empty
  if (!database.data.products || database.data.products.length === 0) {
    database.data.products = productsData.products
    database.data.total_products = productsData.total_products
    await database.write()
    console.log('Data migration completed successfully!')
  }
}

// Helper function to migrate existing content from content.ts
export async function migrateExistingContent(pageContent: PageContent): Promise<void> {
  const database = await initializeDatabase()
  
  // Check if content is empty (default values)
  const isContentEmpty = !database.data.content || 
                         !database.data.content.hero || 
                         !database.data.content.hero.heading || 
                         !database.data.content.benefits || 
                         database.data.content.benefits.length === 0
  
  if (isContentEmpty) {
    database.data.content = pageContent
    await database.write()
    console.log('Content migration completed successfully!')
  }
} 