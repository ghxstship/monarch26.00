/**
 * Users List Endpoint (Admin Only)
 * GET /api/users
 */

import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/infrastructure/middleware';
import { userService } from '@/lib/core/services/user';

export const GET = withAdmin(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    
    const params = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '20'),
      role: searchParams.get('role') || undefined,
      status: searchParams.get('status') || undefined,
      search: searchParams.get('search') || undefined,
    };
    
    const result = await userService.listUsers(params);
    
    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch users';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
});
