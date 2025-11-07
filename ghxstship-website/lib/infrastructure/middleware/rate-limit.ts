/**
 * Rate Limiting Middleware
 * In-memory rate limiting for API endpoints
 */

import { NextRequest, NextResponse } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Check if request is within rate limit
 * @param request - Next.js request object
 * @param maxRequests - Maximum requests allowed in window
 * @param windowMs - Time window in milliseconds
 * @returns true if within limit, false if exceeded
 */
export function rateLimit(
  request: NextRequest,
  maxRequests = 100,
  windowMs = 60000
): boolean {
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  
  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  
  if (limit.count >= maxRequests) {
    return false;
  }
  
  limit.count++;
  return true;
}

/**
 * Standard rate limit exceeded response
 */
export function rateLimitResponse() {
  return NextResponse.json(
    { error: 'Too many requests. Please try again later.' },
    { 
      status: 429,
      headers: {
        'Retry-After': '60'
      }
    }
  );
}

/**
 * Get current rate limit status for an IP
 */
export function getRateLimitStatus(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  const limit = rateLimitMap.get(ip);
  
  if (!limit) {
    return { count: 0, resetAt: null };
  }
  
  return {
    count: limit.count,
    resetAt: new Date(limit.resetAt),
  };
}
