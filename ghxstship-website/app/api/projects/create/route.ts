/**
 * Project Creation Endpoint
 * POST /api/projects/create - Create new project (auth required)
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withEditor } from '@/lib/infrastructure/middleware';
import { projectService } from '@/lib/core/services/content';

const createProjectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  vertical: z.enum(['IMMERSIVE_ENTERTAINMENT', 'EXPERIENTIAL_MARKETING', 'CREATIVE_MEDIA', 'INTEGRATED_TECHNOLOGY']),  // Required
  client: z.string().max(100).optional(),
  category: z.string().max(50).optional(),
  tags: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const POST = withEditor(async (request: NextRequest, user) => {
  try {
    const body = await request.json();
    const data = createProjectSchema.parse(body);
    
    const project = await projectService.createProject(user.id, data);
    
    return NextResponse.json({
      success: true,
      project,
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    
    const message = error instanceof Error ? error.message : 'Failed to create project';
    const status = message.includes('already exists') ? 409 : 500;
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
});
