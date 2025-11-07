/**
 * Forgot Password Endpoint
 * POST /api/auth/forgot-password
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { authService } from '@/lib/core/services/auth';
import { rateLimit, rateLimitResponse } from '@/lib/infrastructure/middleware';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - prevent abuse
    if (!rateLimit(request, 3, 60000)) {
      return rateLimitResponse();
    }

    const body = await request.json();
    const { email } = forgotPasswordSchema.parse(body);

    const result = await authService.forgotPassword(email);

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

    // Always return success to prevent email enumeration
    return NextResponse.json({
      success: true,
      message: 'If an account exists, a password reset email has been sent',
    });
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
