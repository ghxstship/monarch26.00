/**
 * Media Library Endpoint
 * GET /api/media - List media files
 */

import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/infrastructure/middleware';
import { storageService } from '@/lib/core/services/storage';

export const GET = withAuth(async (request: NextRequest, _user) => {
  try {
    const { searchParams } = new URL(request.url);
    
    const params = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '50'),
      mimeType: searchParams.get('type') || undefined,
      userId: searchParams.get('userId') || undefined,
    };
    
    const result = await storageService.listMedia(params);
    
    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch media';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
});
