/**
 * Reset Password Endpoint
 * POST /api/auth/reset-password
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { authService } from '@/lib/core/services/auth';
import { rateLimit, rateLimitResponse } from '@/lib/infrastructure/middleware';

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    if (!rateLimit(request, 5, 60000)) {
      return rateLimitResponse();
    }

    const body = await request.json();
    const { token, password } = resetPasswordSchema.parse(body);

    const result = await authService.resetPassword(token, password);

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

    const message = error instanceof Error ? error.message : 'Password reset failed';
    
    return NextResponse.json(
      { error: message },
      { status: 400 }
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
