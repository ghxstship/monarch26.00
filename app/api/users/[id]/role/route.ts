/**
 * User Role Management Endpoint (Admin Only)
 * PUT /api/users/[id]/role
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withAdmin } from '@/lib/infrastructure/middleware';
import { userService } from '@/lib/core/services/user';

const updateRoleSchema = z.object({
  role: z.enum(['VIEWER', 'EDITOR', 'ADMIN', 'SUPER_ADMIN']),
});

export const PUT = withAdmin(async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;
    const body = await request.json();
    const { role } = updateRoleSchema.parse(body);
    
    const updatedUser = await userService.updateUserRole(id, role);
    
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
    
    const message = error instanceof Error ? error.message : 'Failed to update role';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
});
