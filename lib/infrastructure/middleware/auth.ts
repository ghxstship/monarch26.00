/**
 * Authentication & Authorization Middleware
 * Provides request authentication and role-based access control
 */

import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/core/services/auth';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    name: string | null;
    role: string;
    status: string;
    avatar: string | null;
  };
}

/**
 * Require authentication for a request
 * Extracts and verifies JWT token from Authorization header
 */
export async function requireAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Missing or invalid authorization header');
  }

  const token = authHeader.replace('Bearer ', '');
  
  try {
    const user = await authService.verifyToken(token);
    return user;
  } catch {
    throw new Error('Invalid or expired token');
  }
}

/**
 * Require specific role(s) for a request
 * Checks if authenticated user has one of the required roles
 */
export async function requireRole(request: NextRequest, allowedRoles: string[]) {
  const user = await requireAuth(request);
  
  if (!allowedRoles.includes(user.role)) {
    throw new Error('Insufficient permissions');
  }
  
  return user;
}

/**
 * Require admin role
 */
export async function requireAdmin(request: NextRequest) {
  return requireRole(request, ['ADMIN', 'SUPER_ADMIN']);
}

/**
 * Require editor or admin role
 */
export async function requireEditor(request: NextRequest) {
  return requireRole(request, ['EDITOR', 'ADMIN', 'SUPER_ADMIN']);
}

/**
 * Optional authentication - returns user if authenticated, null otherwise
 */
export async function optionalAuth(request: NextRequest) {
  try {
    return await requireAuth(request);
  } catch {
    return null;
  }
}

/**
 * Wrapper for authenticated API routes
 */
type AuthUser = Awaited<ReturnType<typeof requireAuth>>;

export function withAuth<T = unknown>(
  handler: (request: NextRequest, user: AuthUser, context: T) => Promise<NextResponse>
) {
  return async (request: NextRequest, context: T) => {
    try {
      const user = await requireAuth(request);
      return await handler(request, user, context);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Authentication failed';
      return NextResponse.json(
        { error: message },
        { status: 401 }
      );
    }
  };
}

/**
 * Wrapper for role-protected API routes
 */
export function withRole(
  allowedRoles: string[],
  handler: (request: NextRequest, user: AuthUser) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    try {
      const user = await requireRole(request, allowedRoles);
      return await handler(request, user);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Authorization failed';
      const status = message.includes('permissions') ? 403 : 401;
      return NextResponse.json(
        { error: message },
        { status }
      );
    }
  };
}

/**
 * Wrapper for editor-only API routes
 */
export function withEditor<T = unknown>(
  handler: (request: NextRequest, user: AuthUser, context: T) => Promise<NextResponse>
) {
  return async (request: NextRequest, context: T) => {
    try {
      const user = await requireRole(request, ['EDITOR', 'ADMIN', 'SUPER_ADMIN']);
      return await handler(request, user, context);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Authorization failed';
      const status = message.includes('permissions') ? 403 : 401;
      return NextResponse.json(
        { error: message },
        { status }
      );
    }
  };
}

/**
 * Wrapper for admin-only API routes
 */
export function withAdmin<T = unknown>(
  handler: (request: NextRequest, user: AuthUser, context: T) => Promise<NextResponse>
) {
  return async (request: NextRequest, context: T) => {
    try {
      const user = await requireRole(request, ['ADMIN', 'SUPER_ADMIN']);
      return await handler(request, user, context);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Authorization failed';
      const status = message.includes('permissions') ? 403 : 401;
      return NextResponse.json(
        { error: message },
        { status }
      );
    }
  };
}
