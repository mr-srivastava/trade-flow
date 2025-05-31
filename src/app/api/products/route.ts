import { NextRequest, NextResponse } from 'next/server'
import { 
  getAllProducts, 
  addProduct, 
  isAuthorizedAdmin 
} from '@/lib/db'
import { z } from 'zod'

// Validation schema for product creation
const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug_name: z.string().min(1, 'Slug name is required'),
  hsn_no: z.string().min(1, 'HSN number is required'),
  cas_number: z.string().min(1, 'CAS number is required'),
  iupac_name: z.string().min(1, 'IUPAC name is required'),
  molecular_formula: z.string().min(1, 'Molecular formula is required'),
  description: z.string(),
  industries: z.array(z.string()),
  properties: z.array(z.object({
    key: z.string(),
    value: z.string()
  })),
  safety_and_hazard: z.array(z.object({
    key: z.string(),
    value: z.string()
  })),
  applications: z.array(z.object({
    key: z.string(),
    value: z.string()
  })),
  certificates: z.array(z.object({
    name: z.string(),
    issued_date: z.string().nullable(),
    url: z.string()
  })),
  faq: z.array(z.object({
    key: z.string(),
    value: z.string()
  }))
})

// GET /api/products - Get all products
export async function GET() {
  try {
    const productsResponse = await getAllProducts()
    return NextResponse.json(productsResponse)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST /api/products - Create a new product (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    const authHeader = request.headers.get('authorization')
    if (!isAuthorizedAdmin(authHeader)) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = createProductSchema.parse(body)

    // Create the product
    const newProduct = await addProduct(validatedData)

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: error.errors 
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
