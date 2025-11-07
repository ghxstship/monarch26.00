/**
 * Comment Management Service
 * Handles comment CRUD operations and moderation
 */

import { prisma } from '@/lib/infrastructure/database';
import { CommentStatus } from '@prisma/client';

export class CommentService {
  /**
   * List comments for a blog post
   */
  async listComments(postId: string, params: {
    page?: number;
    limit?: number;
    status?: string;
  }) {
    const page = params.page || 1;
    const limit = params.limit || 50;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {
      postId,
    };

    if (params.status) {
      where.status = params.status;
    }

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            }
          },
          replies: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  avatar: true,
                }
              }
            },
            orderBy: { createdAt: 'asc' }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.comment.count({ where })
    ]);

    return {
      comments,
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
   * Create comment
   */
  async createComment(userId: string, data: {
    postId: string;
    content: string;
    parentId?: string;
  }) {
    // Check if post exists
    const post = await prisma.blogPost.findUnique({
      where: { id: data.postId },
      select: { id: true, status: true }
    });

    if (!post || post.status !== 'PUBLISHED') {
      throw new Error('Blog post not found or not published');
    }

    const comment = await prisma.comment.create({
      data: {
        userId,
        blogPostId: data.postId,  // Schema uses blogPostId
        content: data.content,
        parentId: data.parentId,
        status: 'PENDING', // Require moderation
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          }
        }
      }
    });

    return comment;
  }

  /**
   * Update comment (user can only edit their own)
   */
  async updateComment(commentId: string, userId: string, content: string) {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { userId: true }
    });

    if (!comment) {
      throw new Error('Comment not found');
    }

    if (comment.userId !== userId) {
      throw new Error('Unauthorized to edit this comment');
    }

    const updated = await prisma.comment.update({
      where: { id: commentId },
      data: { content },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          }
        }
      }
    });

    return updated;
  }

  /**
   * Delete comment (user can delete their own, admin can delete any)
   */
  async deleteComment(commentId: string, userId: string, isAdmin = false) {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { userId: true }
    });

    if (!comment) {
      throw new Error('Comment not found');
    }

    if (!isAdmin && comment.userId !== userId) {
      throw new Error('Unauthorized to delete this comment');
    }

    await prisma.comment.delete({
      where: { id: commentId }
    });

    return { message: 'Comment deleted successfully' };
  }

  /**
   * Moderate comment (admin only)
   */
  async moderateComment(commentId: string, status: string) {
    const comment = await prisma.comment.update({
      where: { id: commentId },
      data: { status: status as CommentStatus },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          }
        }
      }
    });

    return comment;
  }

  /**
   * Get comment statistics
   */
  async getCommentStats() {
    const [total, pending, approved, rejected] = await Promise.all([
      prisma.comment.count(),
      prisma.comment.count({ where: { status: 'PENDING' } }),
      prisma.comment.count({ where: { status: 'APPROVED' } }),
      prisma.comment.count({ where: { status: 'REJECTED' } }),
    ]);

    return {
      total,
      pending,
      approved,
      rejected,
    };
  }
}

// Export singleton instance
export const commentService = new CommentService();
