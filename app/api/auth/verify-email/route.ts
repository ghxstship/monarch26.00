/**
 * Email Verification Endpoint
 * POST /api/auth/verify-email
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { authService } from '@/lib/core/services/auth';

const verifySchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = verifySchema.parse(body);

    const result = await authService.verifyEmail(token);

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

    const message = error instanceof Error ? error.message : 'Email verification failed';
    
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
