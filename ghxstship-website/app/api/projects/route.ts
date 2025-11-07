/**
 * Projects API Endpoint
 * Public endpoint for fetching projects/case studies with filtering and pagination
 */

import { NextRequest, NextResponse } from 'next/server';
import { projectFilterSchema } from '@/lib/shared/validation';
import { prisma } from '@/lib/infrastructure/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse and validate query parameters
    const params = projectFilterSchema.parse({
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '10',
      vertical: searchParams.get('vertical') || undefined,
      service: searchParams.get('service') || undefined,
      year: searchParams.get('year') || undefined,
      featured: searchParams.get('featured') || undefined,
      search: searchParams.get('search') || undefined,
      sortBy: searchParams.get('sortBy') || 'publishedAt',
      sortOrder: searchParams.get('sortOrder') || 'desc',
    });

    const skip = (params.page - 1) * params.limit;

    // Build where clause
    const where: Record<string, unknown> = {
      status: 'PUBLISHED',
      deletedAt: null,
    };

    if (params.vertical) {
      where.vertical = params.vertical;
    }

    if (params.service) {
      where.services = {
        has: params.service,
      };
    }

    if (params.year) {
      where.year = params.year;
    }

    if (params.featured !== undefined) {
      where.featured = params.featured;
    }

    if (params.search) {
      where.OR = [
        { title: { contains: params.search, mode: 'insensitive' } },
        { description: { contains: params.search, mode: 'insensitive' } },
        { client: { contains: params.search, mode: 'insensitive' } },
        { tags: { has: params.search } },
      ];
    }

    // Execute query
    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: params.limit,
        orderBy: {
          [params.sortBy]: params.sortOrder,
        },
        select: {
          id: true,
          slug: true,
          title: true,
          subtitle: true,
          excerpt: true,
          vertical: true,
          services: true,
          heroImage: true,
          client: true,
          location: true,
          year: true,
          tags: true,
          featured: true,
          publishedAt: true,
          viewCount: true,
        },
      }),
      prisma.project.count({ where }),
    ]);

    const totalPages = Math.ceil(total / params.limit);

    return NextResponse.json({
      success: true,
      data: projects,
      pagination: {
        page: params.page,
        limit: params.limit,
        total,
        totalPages,
        hasMore: params.page < totalPages,
      },
    });
  } catch (error) {
    console.error('Projects API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
