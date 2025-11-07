/**
 * Blog Post Publish Endpoint
 * POST /api/blog/[id]/publish - Publish blog post (auth required)
 */

import { NextRequest, NextResponse } from 'next/server';
import { withEditor } from '@/lib/infrastructure/middleware';
import { blogService } from '@/lib/core/services/content';

export const POST = withEditor(async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;
    const post = await blogService.publishPost(id, user.id);
    
    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to publish blog post';
    const status = message.includes('not found') ? 404 : 500;
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
});
