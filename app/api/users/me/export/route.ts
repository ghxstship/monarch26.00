/**
 * User Data Export Endpoint (GDPR Compliance)
 * GET /api/users/me/export
 */

import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/infrastructure/middleware';
import { userService } from '@/lib/core/services/user';

export const GET = withAuth(async (request, user) => {
  try {
    const data = await userService.exportUserData(user.id);
    
    return new NextResponse(JSON.stringify(data, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="user-data-${user.id}.json"`,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to export data';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
});
