/**
 * Project Statistics Endpoint
 * GET /api/projects/stats - Get project statistics (admin only)
 */

import { NextResponse } from 'next/server';
import { withAdmin } from '@/lib/infrastructure/middleware';
import { projectService } from '@/lib/core/services/content';

export const GET = withAdmin(async () => {
  try {
    const stats = await projectService.getProjectStats();
    
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
