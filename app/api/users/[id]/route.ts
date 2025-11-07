/**
 * User Management Endpoint (Admin Only)
 * GET /api/users/[id] - Get user by ID
 * DELETE /api/users/[id] - Delete user
 */

import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/infrastructure/middleware';
import { userService } from '@/lib/core/services/user';

export const GET = withAdmin(async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;
    const fetchedUser = await userService.getUserById(id);
    
    return NextResponse.json({
      success: true,
      user: fetchedUser,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch user';
    const status = message.includes('not found') ? 404 : 500;
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
});

export const DELETE = withAdmin(async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;
    const result = await userService.deleteUser(id);
    
    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete user';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
});
