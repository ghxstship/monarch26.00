/**
 * Blog Post Creation Endpoint
 * POST /api/blog/create - Create new blog post (auth required)
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withEditor } from '@/lib/infrastructure/middleware';
import { blogService } from '@/lib/core/services/content';

const createBlogSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters').max(500),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  category: z.string().max(50),  // Required by schema
  tags: z.array(z.string()).optional(),
  featuredImage: z.string().url().optional(),
  featured: z.boolean().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const POST = withEditor(async (request: NextRequest, user) => {
  try {
    const body = await request.json();
    const data = createBlogSchema.parse(body);
    
    const post = await blogService.createPost(user.id, data);
    
    return NextResponse.json({
      success: true,
      post,
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    
    const message = error instanceof Error ? error.message : 'Failed to create blog post';
    const status = message.includes('already exists') ? 409 : 500;
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
});
