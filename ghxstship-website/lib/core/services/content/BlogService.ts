/**
 * Blog Management Service
 * Handles blog post CRUD operations
 */

import { prisma } from '@/lib/infrastructure/database';
import { generateSlug } from '@/lib/shared/utils';
import { BlogPostStatus, BlogCategory } from '@prisma/client';

export class BlogService {
  /**
   * List all blog posts with filtering and pagination
   */
  async listPosts(params: {
    page?: number;
    limit?: number;
    status?: string;
    category?: string;
    tag?: string;
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

    if (params.tag) {
      where.tags = { has: params.tag };
    }

    if (params.featured !== undefined) {
      where.featured = params.featured;
    }

    if (params.search) {
      where.OR = [
        { title: { contains: params.search, mode: 'insensitive' } },
        { excerpt: { contains: params.search, mode: 'insensitive' } },
        { content: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        skip,
        take: limit,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            }
          },
          _count: {
            select: {
              comments: true,
            }
          }
        },
        orderBy: [
          { featured: 'desc' },
          { publishedAt: 'desc' },
        ],
      }),
      prisma.blogPost.count({ where })
    ]);

    return {
      posts,
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
   * Get blog post by ID or slug
   */
  async getPost(identifier: string, includeUnpublished = false) {
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

    const post = await prisma.blogPost.findFirst({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            bio: true,
          }
        },
        comments: {
          where: { status: 'APPROVED' },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 50,
        }
      }
    });

    if (!post) {
      throw new Error('Blog post not found');
    }

    // Increment view count
    await prisma.blogPost.update({
      where: { id: post.id },
      data: { viewCount: { increment: 1 } }
    });

    return post;
  }

  /**
   * Create new blog post
   */
  async createPost(userId: string, data: {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    tags?: string[];
    featuredImage?: string;
    featured?: boolean;
    status?: string;
    publishedAt?: Date;
    metadata?: Record<string, unknown>;
  }) {
    const slug = generateSlug(data.title);

    // Check for duplicate slug
    const existing = await prisma.blogPost.findUnique({
      where: { slug }
    });

    if (existing) {
      throw new Error('A blog post with this title already exists');
    }

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category as BlogCategory, // BlogCategory enum
        tags: data.tags || [],
        featuredImage: data.featuredImage,
        featured: data.featured || false,
        publishedAt: data.publishedAt,
        slug,
        authorId: userId,
        status: (data.status as BlogPostStatus) || BlogPostStatus.DRAFT,
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
        action: 'BLOG_POST_CREATED',
        metadata: { postId: post.id, title: post.title }
      }
    });

    return post;
  }

  /**
   * Update blog post
   */
  async updatePost(postId: string, userId: string, data: {
    title?: string;
    excerpt?: string;
    content?: string;
    category?: string;
    tags?: string[];
    featuredImage?: string;
    featured?: boolean;
    status?: string;
    publishedAt?: Date;
    metadata?: Record<string, unknown>;
  }) {
    // Check ownership or admin
    const post = await prisma.blogPost.findUnique({
      where: { id: postId },
      select: { authorId: true }
    });

    if (!post) {
      throw new Error('Blog post not found');
    }

    // Generate new slug if title changed
    let slug: string | undefined;
    if (data.title) {
      slug = generateSlug(data.title);
      
      // Check for duplicate slug (excluding current post)
      const existing = await prisma.blogPost.findFirst({
        where: {
          slug,
          id: { not: postId }
        }
      });

      if (existing) {
        throw new Error('A blog post with this title already exists');
      }
    }

    const updateData: Record<string, unknown> = {};
    if (data.title) updateData.title = data.title;
    if (data.excerpt) updateData.excerpt = data.excerpt;
    if (data.content) updateData.content = data.content;
    if (data.category) updateData.category = data.category;
    if (data.tags) updateData.tags = data.tags;
    if (data.featuredImage !== undefined) updateData.featuredImage = data.featuredImage;
    if (data.featured !== undefined) updateData.featured = data.featured;
    if (data.status) updateData.status = data.status as BlogPostStatus;
    if (data.publishedAt) updateData.publishedAt = data.publishedAt;
    if (slug) updateData.slug = slug;

    const updated = await prisma.blogPost.update({
      where: { id: postId },
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
        action: 'BLOG_POST_UPDATED',
        metadata: { postId, title: updated.title }
      }
    });

    return updated;
  }

  /**
   * Delete blog post (soft delete)
   */
  async deletePost(postId: string, userId: string) {
    const post = await prisma.blogPost.findUnique({
      where: { id: postId },
      select: { authorId: true, title: true }
    });

    if (!post) {
      throw new Error('Blog post not found');
    }

    await prisma.blogPost.update({
      where: { id: postId },
      data: {
        deletedAt: new Date(),
        status: 'ARCHIVED',
      }
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId,
        action: 'BLOG_POST_DELETED',
        metadata: { postId, title: post.title }
      }
    });

    return { message: 'Blog post deleted successfully' };
  }

  /**
   * Publish blog post
   */
  async publishPost(postId: string, userId: string) {
    const post = await prisma.blogPost.update({
      where: { id: postId },
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
        action: 'BLOG_POST_PUBLISHED',
        metadata: { postId, title: post.title }
      }
    });

    return post;
  }

  /**
   * Get blog statistics
   */
  async getBlogStats() {
    const [total, published, draft, archived, totalViews, totalComments] = await Promise.all([
      prisma.blogPost.count({ where: { deletedAt: null } }),
      prisma.blogPost.count({ where: { status: 'PUBLISHED', deletedAt: null } }),
      prisma.blogPost.count({ where: { status: 'DRAFT', deletedAt: null } }),
      prisma.blogPost.count({ where: { status: 'ARCHIVED', deletedAt: null } }),
      prisma.blogPost.aggregate({
        where: { deletedAt: null },
        _sum: { viewCount: true }
      }),
      prisma.comment.count({ where: { status: 'APPROVED' } })
    ]);

    return {
      total,
      published,
      draft,
      archived,
      totalViews: totalViews._sum.viewCount || 0,
      totalComments,
    };
  }

  /**
   * Get popular posts
   */
  async getPopularPosts(limit = 5) {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: 'PUBLISHED',
        deletedAt: null,
      },
      take: limit,
      orderBy: { viewCount: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        viewCount: true,
        publishedAt: true,
      }
    });

    return posts;
  }

  /**
   * Get related posts
   */
  async getRelatedPosts(postId: string, limit = 3) {
    const post = await prisma.blogPost.findUnique({
      where: { id: postId },
      select: { category: true, tags: true }
    });

    if (!post) {
      return [];
    }

    const posts = await prisma.blogPost.findMany({
      where: {
        id: { not: postId },
        status: 'PUBLISHED',
        deletedAt: null,
        OR: [
          { category: post.category },
          { tags: { hasSome: post.tags } },
        ]
      },
      take: limit,
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        category: true,
        publishedAt: true,
      }
    });

    return posts;
  }
}

// Export singleton instance
export const blogService = new BlogService();
