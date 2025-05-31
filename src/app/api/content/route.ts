import { NextRequest, NextResponse } from 'next/server';
import { 
  getPageContent, 
  updatePageContent, 
  isAuthorizedAdmin 
} from '@/lib/db';

// GET /api/content - Get all page content
export async function GET() {
  try {
    const content = await getPageContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

// PUT /api/content - Update page content (admin only)
export async function PUT(request: NextRequest) {
  try {
    // Check admin authorization
    const authHeader = request.headers.get('authorization');
    if (!isAuthorizedAdmin(authHeader)) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Update the content
    const updatedContent = await updatePageContent(body);

    return NextResponse.json(updatedContent);
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
} 