/**
 * User Account Deletion Endpoint (GDPR Compliance)
 * DELETE /api/users/me/delete
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withAuth } from '@/lib/infrastructure/middleware';
import { userService } from '@/lib/core/services/user';
import { authService } from '@/lib/core/services/auth';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/infrastructure/database';

const deleteAccountSchema = z.object({
  password: z.string().min(1, 'Password is required'),
  confirm: z.boolean().refine(val => val === true, {
    message: 'You must confirm account deletion'
  }),
});

export const DELETE = withAuth(async (request: NextRequest, user) => {
  try {
    const body = await request.json();
    const { password } = deleteAccountSchema.parse(body);
    
    // Verify password before deletion
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: { passwordHash: true }
    });
    
    if (!userData?.passwordHash) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    const isValid = await bcrypt.compare(password, userData.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }
    
    // Logout all sessions
    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      await authService.logout(token);
    }
    
    // Permanently delete user and all data
    await userService.permanentlyDeleteUser(user.id);
    
    return NextResponse.json({
      success: true,
      message: 'Account and all associated data have been permanently deleted',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    
    const message = error instanceof Error ? error.message : 'Failed to delete account';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
});
