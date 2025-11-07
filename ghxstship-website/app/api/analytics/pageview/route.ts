/**
 * Page View Tracking Endpoint
 * POST /api/analytics/pageview - Track page view
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/infrastructure/database';
import { rateLimit, rateLimitResponse } from '@/lib/infrastructure/middleware';

const pageViewSchema = z.object({
  page: z.string().max(500),
  title: z.string().max(200).optional(),
  referrer: z.string().max(500).optional(),
});

export async function POST(request: NextRequest) {
  // Rate limiting
  if (!rateLimit(request, 100, 60000)) {
    return rateLimitResponse();
  }

  try {
    const body = await request.json();
    const data = pageViewSchema.parse(body);
    
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    await prisma.pageView.create({
      data: {
        path: data.page,  // Schema uses 'path' not 'page'
        title: data.title,
        referrer: data.referrer,
        ipAddress,
        userAgent,
      }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Page view tracked',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    
    const message = error instanceof Error ? error.message : 'Failed to track page view';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
