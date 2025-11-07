/**
 * Media Statistics Endpoint
 * GET /api/media/stats - Get media statistics (admin only)
 */

import { NextResponse } from 'next/server';
import { withAdmin } from '@/lib/infrastructure/middleware';
import { storageService } from '@/lib/core/services/storage';

export const GET = withAdmin(async () => {
  try {
    const stats = await storageService.getMediaStats();
    
    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch statistics';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
});
