/**
 * Analytics Tracking Endpoint
 * POST /api/analytics/track - Track analytics event
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/infrastructure/database';
import { rateLimit, rateLimitResponse } from '@/lib/infrastructure/middleware';
import { EventType } from '@prisma/client';

const trackEventSchema = z.object({
  eventType: z.string().max(50),
  eventData: z.record(z.string(), z.unknown()).optional(),
  page: z.string().max(500).optional(),
  referrer: z.string().max(500).optional(),
});

export async function POST(request: NextRequest) {
  // Rate limiting
  if (!rateLimit(request, 100, 60000)) {
    return rateLimitResponse();
  }

  try {
    const body = await request.json();
    const data = trackEventSchema.parse(body);
    
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    await prisma.analyticsEvent.create({
      data: {
        eventType: data.eventType as EventType,
        eventName: data.eventType,  // eventName is required
        properties: (data.eventData || null) as never,  // Schema uses 'properties' not 'eventData', cast to Prisma JSON type
        path: data.page,  // Schema uses 'path' not 'page'
        referrer: data.referrer,
        ipAddress,
        userAgent,
      }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Event tracked',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    
    const message = error instanceof Error ? error.message : 'Failed to track event';
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
