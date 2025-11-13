import { NextRequest, NextResponse } from 'next/server';
import { productService } from '@/lib/services';
import { createProductSchema } from '@/lib/schemas';
import { isAuthorizedAdmin } from '@/lib/utils/auth';
import { z } from 'zod';

// GET /api/products - Get all products
export async function GET() {
  try {
    const productsResponse = await productService.getAllProducts();
    return NextResponse.json(productsResponse);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products - Create a new product (admin only)
export async function POST(request: NextRequest) {
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
    const validatedData = createProductSchema.parse(body);

    // Create the product
    const newProduct = await productService.createProduct(validatedData);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
