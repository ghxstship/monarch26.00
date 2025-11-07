/**
 * Individual Project API Endpoint
 * Fetches a single project by slug and increments view count
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/infrastructure/database';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const project = await prisma.project.findUnique({
      where: {
        slug,
        status: 'PUBLISHED',
        deletedAt: null,
      },
      include: {
        gallery: {
          orderBy: {
            order: 'asc',
          },
        },
        author: {
          select: {
            name: true,
            avatar: true,
          },
        },
        relatedProjects: {
          take: 4,
          include: {
            to: {
              select: {
                id: true,
                slug: true,
                title: true,
                excerpt: true,
                heroImage: true,
                vertical: true,
                services: true,
              },
            },
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Increment view count asynchronously
    prisma.project
      .update({
        where: { id: project.id },
        data: { viewCount: { increment: 1 } },
      })
      .catch((err: Error) => console.error('Failed to increment view count:', err));

    // Track analytics event
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               undefined;
    const userAgent = request.headers.get('user-agent') || undefined;

    prisma.analyticsEvent
      .create({
        data: {
          eventType: 'PROJECT_VIEW',
          eventName: 'project_viewed',
          path: `/work/${slug}`,
          ipAddress: ip,
          userAgent,
          properties: {
            projectId: project.id,
            projectTitle: project.title,
            vertical: project.vertical,
          },
        },
      })
      .catch((err: Error) => console.error('Failed to track analytics:', err));

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Project API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}
