/**
 * Health Check Endpoint
 * GET /api/health
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/infrastructure/database';

export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: `${Math.floor(uptime / 60)} minutes`,
      database: 'connected',
      memory: {
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
      },
      version: process.env.npm_package_version || '0.1.0',
      environment: process.env.NODE_ENV || 'development',
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Database connection failed',
      },
      { status: 503 }
    );
  }
}
