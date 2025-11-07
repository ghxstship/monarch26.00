/**
 * Token Refresh Endpoint
 * POST /api/auth/refresh
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { authService } from '@/lib/core/services/auth';

const refreshSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { refreshToken } = refreshSchema.parse(body);

    const result = await authService.refreshToken(refreshToken);

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

    const message = error instanceof Error ? error.message : 'Token refresh failed';
    
    return NextResponse.json(
      { error: message },
      { status: 401 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
