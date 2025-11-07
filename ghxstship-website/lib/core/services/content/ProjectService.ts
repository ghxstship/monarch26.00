/**
 * Project Management Service
 * Handles project/case study CRUD operations
 */

import { prisma } from '@/lib/infrastructure/database';
import { generateSlug } from '@/lib/shared/utils';
import { ProjectStatus, ProjectVertical } from '@prisma/client';

export class ProjectService {
  /**
   * List all projects with filtering and pagination
   */
  async listProjects(params: {
    page?: number;
    limit?: number;
    status?: string;
    category?: string;
    featured?: boolean;
    search?: string;
  }) {
    const page = params.page || 1;
    const limit = params.limit || 12;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {
      deletedAt: null,
    };

    if (params.status) {
      where.status = params.status;
    }

    if (params.category) {
      where.category = params.category;
    }

    if (params.featured !== undefined) {
      where.featured = params.featured;
    }

    if (params.search) {
      where.OR = [
        { title: { contains: params.search, mode: 'insensitive' } },
        { description: { contains: params.search, mode: 'insensitive' } },
        { client: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: limit,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          },
          _count: {
            select: {
              relatedTo: true,  // Only relatedTo exists in schema
            }
          }
        },
        orderBy: [
          { featured: 'desc' },
          { publishedAt: 'desc' },
        ],
      }),
      prisma.project.count({ where })
    ]);

    return {
      projects,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: page < Math.ceil(total / limit),
      }
    };
  }

  /**
   * Get project by ID or slug
   */
  async getProject(identifier: string, includeUnpublished = false) {
    const where: Record<string, unknown> = {
      deletedAt: null,
    };

    // Check if identifier is UUID or slug
    if (identifier.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      where.id = identifier;
    } else {
      where.slug = identifier;
    }

    if (!includeUnpublished) {
      where.status = 'PUBLISHED';
    }

    const project = await prisma.project.findFirst({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          }
        },
        relatedTo: {
          include: {
            from: {
              select: {
                id: true,
                title: true,
                slug: true,
                vertical: true,  // Use vertical instead of category
              }
            }
          }
        }
      }
    });

    if (!project) {
      throw new Error('Project not found');
    }

    // Increment view count
    await prisma.project.update({
      where: { id: project.id },
      data: { viewCount: { increment: 1 } }
    });

    return project;
  }

  /**
   * Create new project
   */
  async createProject(userId: string, data: {
    title: string;
    description: string;
    content: string;
    vertical: string;  // Required: ProjectVertical enum
    client?: string;
    category?: string;
    tags?: string[];
    technologies?: string[];
    featured?: boolean;
    status?: string;
    publishedAt?: Date;
    metadata?: Record<string, unknown>;
  }) {
    const slug = generateSlug(data.title);

    // Check for duplicate slug
    const existing = await prisma.project.findUnique({
      where: { slug }
    });

    if (existing) {
      throw new Error('A project with this title already exists');
    }

    const project = await prisma.project.create({
      data: {
        ...data,
        slug,
        authorId: userId,
        vertical: data.vertical as ProjectVertical,
        status: (data.status as ProjectStatus) || ProjectStatus.DRAFT,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId,
        action: 'PROJECT_CREATED',
        metadata: { projectId: project.id, title: project.title }
      }
    });

    return project;
  }

  /**
   * Update project
   */
  async updateProject(projectId: string, userId: string, data: {
    title?: string;
    description?: string;
    content?: string;
    client?: string;
    category?: string;
    tags?: string[];
    technologies?: string[];
    featured?: boolean;
    status?: string;
    publishedAt?: Date;
    metadata?: Record<string, unknown>;
  }) {
    // Check ownership or admin
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { authorId: true }
    });

    if (!project) {
      throw new Error('Project not found');
    }

    // Generate new slug if title changed
    let slug: string | undefined;
    if (data.title) {
      slug = generateSlug(data.title);
      
      // Check for duplicate slug (excluding current project)
      const existing = await prisma.project.findFirst({
        where: {
          slug,
          id: { not: projectId }
        }
      });

      if (existing) {
        throw new Error('A project with this title already exists');
      }
    }

    const updateData: Record<string, unknown> = {};
    if (data.title) updateData.title = data.title;
    if (data.description) updateData.description = data.description;
    if (data.content) updateData.content = data.content;
    if (data.client) updateData.client = data.client;
    if (data.category) updateData.category = data.category;
    if (data.tags) updateData.tags = data.tags;
    if (data.technologies) updateData.technologies = data.technologies;
    if (data.featured !== undefined) updateData.featured = data.featured;
    if (data.status) updateData.status = data.status as ProjectStatus;
    if (data.publishedAt) updateData.publishedAt = data.publishedAt;
    if (slug) updateData.slug = slug;

    const updated = await prisma.project.update({
      where: { id: projectId },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId,
        action: 'PROJECT_UPDATED',
        metadata: { projectId, title: updated.title }
      }
    });

    return updated;
  }

  /**
   * Delete project (soft delete)
   */
  async deleteProject(projectId: string, userId: string) {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { authorId: true, title: true }
    });

    if (!project) {
      throw new Error('Project not found');
    }

    await prisma.project.update({
      where: { id: projectId },
      data: {
        deletedAt: new Date(),
        status: 'ARCHIVED',
      }
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId,
        action: 'PROJECT_DELETED',
        metadata: { projectId, title: project.title }
      }
    });

    return { message: 'Project deleted successfully' };
  }

  /**
   * Publish project
   */
  async publishProject(projectId: string, userId: string) {
    const project = await prisma.project.update({
      where: { id: projectId },
      data: {
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId,
        action: 'PROJECT_PUBLISHED',
        metadata: { projectId, title: project.title }
      }
    });

    return project;
  }

  /**
   * Add image to project
   */
  async addProjectImage(projectId: string, data: {
    url: string;
    alt?: string;
    caption?: string;
    order?: number;
  }) {
    // Get max order
    const maxOrder = await prisma.projectImage.findFirst({
      where: { projectId },
      orderBy: { order: 'desc' },
      select: { order: true }
    });

    const image = await prisma.projectImage.create({
      data: {
        projectId,
        url: data.url,
        alt: data.alt,
        caption: data.caption,
        order: data.order ?? (maxOrder?.order ?? 0) + 1,
      }
    });

    return image;
  }

  /**
   * Remove image from project
   */
  async removeProjectImage(imageId: string) {
    await prisma.projectImage.delete({
      where: { id: imageId }
    });

    return { message: 'Image removed successfully' };
  }

  /**
   * Reorder project images
   */
  async reorderProjectImages(projectId: string, imageIds: string[]) {
    await prisma.$transaction(
      imageIds.map((imageId, index) =>
        prisma.projectImage.update({
          where: { id: imageId },
          data: { order: index }
        })
      )
    );

    return { message: 'Images reordered successfully' };
  }

  /**
   * Add related project
   */
  async addRelatedProject(fromId: string, toId: string) {
    const relation = await prisma.projectRelation.create({
      data: {
        fromId,
        toId,
        // Note: relationType field doesn't exist in schema
      }
    });

    return relation;
  }

  /**
   * Remove related project
   */
  async removeRelatedProject(fromId: string, toId: string) {
    await prisma.projectRelation.deleteMany({
      where: {
        fromId,
        toId,
      }
    });

    return { message: 'Relation removed successfully' };
  }

  /**
   * Get project statistics
   */
  async getProjectStats() {
    const [total, published, draft, archived, totalViews] = await Promise.all([
      prisma.project.count({ where: { deletedAt: null } }),
      prisma.project.count({ where: { status: 'PUBLISHED', deletedAt: null } }),
      prisma.project.count({ where: { status: 'DRAFT', deletedAt: null } }),
      prisma.project.count({ where: { status: 'ARCHIVED', deletedAt: null } }),
      prisma.project.aggregate({
        where: { deletedAt: null },
        _sum: { viewCount: true }
      })
    ]);

    return {
      total,
      published,
      draft,
      archived,
      totalViews: totalViews._sum.viewCount || 0,
    };
  }
}

// Export singleton instance
export const projectService = new ProjectService();
