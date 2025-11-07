/**
 * Project Image Detail Endpoint
 * DELETE /api/projects/[id]/images/[imageId] - Remove image
 */

import { NextRequest, NextResponse } from 'next/server';
import { withEditor } from '@/lib/infrastructure/middleware';
import { projectService } from '@/lib/core/services/content';

export const DELETE = withEditor(async (
  _request: NextRequest,
  _user,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) => {
  try {
    const { imageId } = await params;
    const result = await projectService.removeProjectImage(imageId);
    
    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to remove image';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
});
