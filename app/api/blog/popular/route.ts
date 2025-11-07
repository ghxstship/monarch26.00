/**
 * Popular Blog Posts Endpoint
 * GET /api/blog/popular - Get popular blog posts
 */

import { NextRequest, NextResponse } from 'next/server';
import { blogService } from '@/lib/core/services/content';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '5');
    
    const posts = await blogService.getPopularPosts(limit);
    
    return NextResponse.json({
      success: true,
      posts,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch popular posts';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
