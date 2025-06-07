import { NextRequest, NextResponse } from 'next/server';
import { 
  getProductById, 
  updateProduct, 
  deleteProduct, 
  isAuthorizedAdmin,
  getAllProducts
} from '@/lib/mongodb-db';
import { z } from 'zod';

// Validation schema for product updates
const updateProductSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  slug_name: z.string().min(1, 'Slug name is required').optional(),
  hsn_no: z.string().min(1, 'HSN number is required').optional(),
  cas_number: z.string().min(1, 'CAS number is required').optional(),
  iupac_name: z.string().min(1, 'IUPAC name is required').optional(),
  molecular_formula: z.string().min(1, 'Molecular formula is required').optional(),
  description: z.string().optional(),
  industries: z.array(z.string()).optional(),
  properties: z.array(z.object({
    key: z.string(),
    value: z.string()
  })).optional(),
  safety_and_hazard: z.array(z.object({
    key: z.string(),
    value: z.string()
  })).optional(),
  applications: z.array(z.object({
    key: z.string(),
    value: z.string()
  })).optional(),
  certificates: z.array(z.object({
    name: z.string(),
    issued_date: z.string().nullable(),
    url: z.string()
  })).optional(),
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string()
  })).optional()
});

// GET /api/products/[id] - Get a specific product with related products
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await getProductById(params.id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Get all products to find related ones
    const { products } = await getAllProducts();
    
    // Find related products based on shared industries
    const relatedProducts = products
      .filter(
        (p) =>
          p.id !== params.id &&
          p.industries.some((ind) => product.industries.includes(ind))
      )
      .slice(0, 3);

    // Return product with related products
    return NextResponse.json({ ...product, relatedProducts });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - Update a specific product (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin authorization
    const authHeader = request.headers.get('authorization');
    if (!isAuthorizedAdmin(authHeader)) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = updateProductSchema.parse(body);

    // Update the product
    const updatedProduct = await updateProduct(params.id, validatedData);

    if (!updatedProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: error.errors 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Delete a specific product (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin authorization
    const authHeader = request.headers.get('authorization');
    if (!isAuthorizedAdmin(authHeader)) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    // Delete the product
    const deleted = await deleteProduct(params.id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
