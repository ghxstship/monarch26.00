/**
 * Project Detail Endpoint
 * GET /api/projects/[id] - Get project by ID or slug
 * PUT /api/projects/[id] - Update project (auth required)
 * DELETE /api/projects/[id] - Delete project (auth required)
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withEditor } from '@/lib/infrastructure/middleware';
import { projectService } from '@/lib/core/services/content';

const updateProjectSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  description: z.string().min(10).max(500).optional(),
  content: z.string().min(50).optional(),
  client: z.string().max(100).optional(),
  category: z.string().max(50).optional(),
  tags: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
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
    const project = await projectService.getProject(id);
    
    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch project';
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
    const data = updateProjectSchema.parse(body);
    
    const project = await projectService.updateProject(id, user.id, data);
    
    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    
    const message = error instanceof Error ? error.message : 'Failed to update project';
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
    const result = await projectService.deleteProject(id, user.id);
    
    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete project';
    const status = message.includes('not found') ? 404 : 500;
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
});
