/**
 * Analytics Statistics Endpoint
 * GET /api/analytics/stats - Get analytics statistics (admin only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/infrastructure/middleware';
import { prisma } from '@/lib/infrastructure/database';

export const GET = withAdmin(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const [totalPageViews, uniqueVisitors, topPages, recentEvents] = await Promise.all([
      prisma.pageView.count({
        where: {
          createdAt: { gte: startDate }
        }
      }),
      prisma.pageView.groupBy({
        by: ['ipAddress'],
        where: {
          createdAt: { gte: startDate }
        },
        _count: true
      }),
      prisma.pageView.groupBy({
        by: ['path'],
        where: {
          createdAt: { gte: startDate }
        },
        _count: true,
        orderBy: {
          _count: {
            path: 'desc'
          }
        },
        take: 10
      }),
      prisma.analyticsEvent.findMany({
        where: {
          createdAt: { gte: startDate }
        },
        orderBy: { createdAt: 'desc' },
        take: 100,
        select: {
          eventType: true,
          path: true,
          createdAt: true,
        }
      })
    ]);
    
    return NextResponse.json({
      success: true,
      stats: {
        totalPageViews,
        uniqueVisitors: uniqueVisitors.length,
        topPages: topPages.map(p => ({
          page: p.path,
          views: p._count
        })),
        recentEvents,
        period: `${days} days`
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch analytics';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
});
