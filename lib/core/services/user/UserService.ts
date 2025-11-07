/**
 * User Management Service
 * Handles user CRUD operations, role management, and user queries
 */

import { prisma } from '@/lib/infrastructure/database';
import bcrypt from 'bcryptjs';
import { UserRole, UserStatus } from '@prisma/client';

export class UserService {
  /**
   * Get user by ID
   */
  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        avatar: true,
        bio: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(userId: string) {
    return this.getUserById(userId);
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, data: {
    name?: string;
    bio?: string;
    avatar?: string;
  }) {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        avatar: true,
        bio: true,
        updatedAt: true,
      }
    });

    return user;
  }

  /**
   * Change user password
   */
  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, passwordHash: true }
    });

    if (!user || !user.passwordHash) {
      throw new Error('User not found');
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isValid) {
      throw new Error('Current password is incorrect');
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 12);

    // Update password and revoke all sessions
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { passwordHash }
      }),
      prisma.session.updateMany({
        where: { userId },
        data: { revokedAt: new Date() }
      })
    ]);

    return { message: 'Password changed successfully' };
  }

  /**
   * List all users (admin only)
   */
  async listUsers(params: {
    page?: number;
    limit?: number;
    role?: string;
    status?: string;
    search?: string;
  }) {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (params.role) {
      where.role = params.role;
    }

    if (params.status) {
      where.status = params.status;
    }

    if (params.search) {
      where.OR = [
        { email: { contains: params.search, mode: 'insensitive' } },
        { name: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          status: true,
          avatar: true,
          emailVerified: true,
          createdAt: true,
          lastLoginAt: true,
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where })
    ]);

    return {
      users,
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
   * Update user role (admin only)
   */
  async updateUserRole(userId: string, role: string) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: role as UserRole },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      }
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId,
        action: 'ROLE_CHANGED',
        metadata: { newRole: role }
      }
    });

    return user;
  }

  /**
   * Update user status (admin only)
   */
  async updateUserStatus(userId: string, status: string) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { status: status as UserStatus },
      select: {
        id: true,
        email: true,
        name: true,
        status: true,
      }
    });

    // If suspended, revoke all sessions
    if (status === 'SUSPENDED') {
      await prisma.session.updateMany({
        where: { userId },
        data: { revokedAt: new Date() }
      });
    }

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId,
        action: 'STATUS_CHANGED',
        metadata: { newStatus: status }
      }
    });

    return user;
  }

  /**
   * Delete user (admin only)
   */
  async deleteUser(userId: string) {
    // Soft delete
    await prisma.user.update({
      where: { id: userId },
      data: {
        deletedAt: new Date(),
        status: 'SUSPENDED',
      }
    });

    // Revoke all sessions
    await prisma.session.updateMany({
      where: { userId },
      data: { revokedAt: new Date() }
    });

    return { message: 'User deleted successfully' };
  }

  /**
   * Get user activity log
   */
  async getUserActivity(userId: string, limit = 50) {
    const activities = await prisma.activityLog.findMany({
      where: { userId },
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        action: true,
        ipAddress: true,
        metadata: true,
        createdAt: true,
      }
    });

    return activities;
  }

  /**
   * Export user data (GDPR compliance)
   */
  async exportUserData(userId: string) {
    // First get user to access email
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        bio: true,
        avatar: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
      }
    });

    if (!userData) {
      throw new Error('User not found');
    }

    const [projects, comments, submissions, sessions, activities] = await Promise.all([
      prisma.project.findMany({
        where: { authorId: userId },
        select: {
          id: true,
          title: true,
          slug: true,
          status: true,
          createdAt: true,
          publishedAt: true,
        }
      }),
      prisma.comment.findMany({
        where: { userId },
        select: {
          id: true,
          content: true,
          status: true,
          createdAt: true,
        }
      }),
      prisma.contactSubmission.findMany({
        where: { email: userData.email },
        select: {
          id: true,
          name: true,
          message: true,
          formType: true,
          createdAt: true,
        }
      }),
      prisma.session.findMany({
        where: { userId },
        select: {
          id: true,
          ipAddress: true,
          userAgent: true,
          createdAt: true,
          expiresAt: true,
          revokedAt: true,
        }
      }),
      prisma.activityLog.findMany({
        where: { userId },
        select: {
          id: true,
          action: true,
          ipAddress: true,
          metadata: true,
          createdAt: true,
        }
      })
    ]);

    return {
      user: userData,
      projects,
      comments,
      contactSubmissions: submissions,
      sessions,
      activityLog: activities,
      exportedAt: new Date().toISOString(),
    };
  }

  /**
   * Permanently delete user and all data (GDPR compliance)
   */
  async permanentlyDeleteUser(userId: string) {
    // Get user email first for PasswordReset deletion
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true }
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Delete in transaction to ensure atomicity
    await prisma.$transaction([
      // Delete related data
      prisma.session.deleteMany({ where: { userId } }),
      prisma.passwordReset.deleteMany({ where: { email: user.email } }),  // Uses email not userId
      prisma.activityLog.deleteMany({ where: { userId } }),
      prisma.comment.deleteMany({ where: { userId } }),
      // Soft delete projects (keep for business records)
      prisma.project.updateMany({
        where: { authorId: userId },
        data: { deletedAt: new Date() }
      }),
      // Finally delete user
      prisma.user.delete({ where: { id: userId } })
    ]);

    return { message: 'User and all associated data permanently deleted' };
  }
}

// Export singleton instance
export const userService = new UserService();
