import { NextRequest, NextResponse } from 'next/server';
import { 
  getPageContent, 
  updateContentSection, 
  isAuthorizedAdmin 
} from '@/lib/mongodb-db';
import { PageContent } from '@/lib/types';

// Valid content sections
const validSections: (keyof PageContent)[] = [
  'hero', 
  'benefits', 
  'about', 
  'productCategories', 
  'synFlowFeatures', 
  'resourcesData'
];

// GET /api/content/[section] - Get specific content section
export async function GET(
  request: NextRequest,
  { params }: { params: { section: string } }
) {
  try {
    const section = params.section as keyof PageContent;
    
    if (!validSections.includes(section)) {
      return NextResponse.json(
        { error: `Invalid section. Valid sections: ${validSections.join(', ')}` },
        { status: 400 }
      );
    }

    const content = await getPageContent();
    return NextResponse.json(content[section]);
  } catch (error) {
    console.error('Error fetching content section:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content section' },
      { status: 500 }
    );
  }
}

// PUT /api/content/[section] - Update specific content section (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { section: string } }
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

    const section = params.section as keyof PageContent;
    
    if (!validSections.includes(section)) {
      return NextResponse.json(
        { error: `Invalid section. Valid sections: ${validSections.join(', ')}` },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Update the specific content section
    const updatedContent = await updateContentSection(section, body);

    return NextResponse.json(updatedContent[section]);
  } catch (error) {
    console.error('Error updating content section:', error);
    return NextResponse.json(
      { error: 'Failed to update content section' },
      { status: 500 }
    );
  }
} 