/**
 * Media Detail Endpoint
 * DELETE /api/media/[id] - Delete media file
 */

import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/infrastructure/middleware';
import { storageService } from '@/lib/core/services/storage';

export const DELETE = withAuth(async (
  request: NextRequest,
  user,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const result = await storageService.deleteFile(id);
    
    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete file';
    const status = message.includes('not found') ? 404 : 500;
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
});
