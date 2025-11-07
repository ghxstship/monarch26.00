/**
 * Project Publish Endpoint
 * POST /api/projects/[id]/publish - Publish project (auth required)
 */

import { NextRequest, NextResponse } from 'next/server';
import { withEditor } from '@/lib/infrastructure/middleware';
import { projectService } from '@/lib/core/services/content';

export const POST = withEditor(async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;
    const project = await projectService.publishProject(id, user.id);
    
    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to publish project';
    const status = message.includes('not found') ? 404 : 500;
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
});
