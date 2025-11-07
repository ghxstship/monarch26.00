/**
 * Media Signed URL Endpoint
 * GET /api/media/[id]/signed-url - Get signed URL for private file access
 */

import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/infrastructure/middleware';
import { storageService } from '@/lib/core/services/storage';

export const GET = withAuth(async (
  request: NextRequest,
  user,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const expiresIn = parseInt(searchParams.get('expiresIn') || '3600');
    
    const result = await storageService.getSignedUrl(id, expiresIn);
    
    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to generate signed URL';
    const status = message.includes('not found') ? 404 : 500;
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
});
