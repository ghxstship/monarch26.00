/**
 * Blog Post Detail Endpoint
 * GET /api/blog/[id] - Get blog post by ID or slug
 * PUT /api/blog/[id] - Update blog post (auth required)
 * DELETE /api/blog/[id] - Delete blog post (auth required)
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withEditor } from '@/lib/infrastructure/middleware';
import { blogService } from '@/lib/core/services/content';

const updateBlogSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  excerpt: z.string().min(10).max(500).optional(),
  content: z.string().min(50).optional(),
  category: z.string().max(50).optional(),
  tags: z.array(z.string()).optional(),
  featuredImage: z.string().url().optional(),
  featured: z.boolean().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await blogService.getPost(id);
    
    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch blog post';
    const status = message.includes('not found') ? 404 : 500;
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}

export const PUT = withEditor(async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = updateBlogSchema.parse(body);
    
    const post = await blogService.updatePost(id, user.id, data);
    
    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    
    const message = error instanceof Error ? error.message : 'Failed to update blog post';
    const status = message.includes('not found') ? 404 : 500;
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
});

export const DELETE = withEditor(async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;
    const result = await blogService.deletePost(id, user.id);
    
    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete blog post';
    const status = message.includes('not found') ? 404 : 500;
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
});
