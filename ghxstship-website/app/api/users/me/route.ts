/**
 * Current User Profile Endpoint
 * GET /api/users/me - Get current user
 * PUT /api/users/me - Update current user
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { withAuth } from '@/lib/infrastructure/middleware';
import { userService } from '@/lib/core/services/user';

const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional(),
});

export const GET = withAuth(async (request, user) => {
  try {
    const profile = await userService.getCurrentUser(user.id);
    
    return NextResponse.json({
      success: true,
      user: profile,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch profile';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
});

export const PUT = withAuth(async (request, user) => {
  try {
    const body = await request.json();
    const data = updateProfileSchema.parse(body);
    
    const updatedUser = await userService.updateProfile(user.id, data);
    
    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    
    const message = error instanceof Error ? error.message : 'Failed to update profile';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
});
