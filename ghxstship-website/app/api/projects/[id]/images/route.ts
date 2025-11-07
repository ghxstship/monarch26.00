/**
 * Project Images Endpoint
 * POST /api/projects/[id]/images - Add image to project
 * PUT /api/projects/[id]/images - Reorder images
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withEditor } from '@/lib/infrastructure/middleware';
import { projectService } from '@/lib/core/services/content';

const addImageSchema = z.object({
  url: z.string().url('Must be a valid URL'),
  alt: z.string().max(200).optional(),
  caption: z.string().max(500).optional(),
  order: z.number().int().min(0).optional(),
});

const reorderImagesSchema = z.object({
  imageIds: z.array(z.string().uuid()),
});

export const POST = withEditor(async (request: NextRequest, _user, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = addImageSchema.parse(body);
    
    const image = await projectService.addProjectImage(id, data);
    
    return NextResponse.json({
      success: true,
      image,
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    
    const message = error instanceof Error ? error.message : 'Failed to add image';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
});

export const PUT = withEditor(async (request: NextRequest, _user, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;
    const body = await request.json();
    const { imageIds } = reorderImagesSchema.parse(body);
    
    const result = await projectService.reorderProjectImages(id, imageIds);
    
    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    
    const message = error instanceof Error ? error.message : 'Failed to reorder images';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
});
