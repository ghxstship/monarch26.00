/**
 * Related Blog Posts Endpoint
 * GET /api/blog/[id]/related - Get related blog posts
 */

import { NextRequest, NextResponse } from 'next/server';
import { blogService } from '@/lib/core/services/content';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '3');
    
    const posts = await blogService.getRelatedPosts(id, limit);
    
    return NextResponse.json({
      success: true,
      posts,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch related posts';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
