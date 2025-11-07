/**
 * Authentication Service
 * Handles user registration, login, password management, and session management
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/infrastructure/database';
import { sendWelcomeEmail, sendPasswordResetEmail } from '@/lib/features/email';
import { UserStatus } from '@prisma/client';
import crypto from 'crypto';

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET!;
  private readonly JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
  private readonly TOKEN_EXPIRY = '24h';
  private readonly REFRESH_TOKEN_EXPIRY = '7d';
  private readonly SALT_ROUNDS = 12;

  /**
   * Register a new user
   */
  async register(email: string, password: string, name: string) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, this.SALT_ROUNDS);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    // Note: verificationExpires would be used if emailVerificationExpires field existed in schema

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        name,
        role: 'VIEWER',
        status: UserStatus.PENDING,
        emailVerificationToken: verificationToken,
        // Note: emailVerificationExpires not in schema, using token expiry logic elsewhere
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
      }
    });

    // Send verification email
    try {
      await sendWelcomeEmail(user.email, user.name || 'User');
      // TODO: Send verification email with token
    } catch (error) {
      console.error('Failed to send welcome email:', error);
    }

    return user;
  }

  /**
   * Login user with email and password
   */
  async login(email: string, password: string, ipAddress?: string, userAgent?: string) {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user || !user.passwordHash) {
      throw new Error('Invalid credentials');
    }

    // Check if account is active
    if (user.status !== 'ACTIVE') {
      throw new Error('Account is not active. Please verify your email.');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    
    if (!isValidPassword) {
      // Log failed attempt
      await this.logFailedLogin(user.id, ipAddress);
      throw new Error('Invalid credentials');
    }

    // Check for account lockout
    if (user.failedLoginAttempts >= 5) {
      const lockoutExpiry = user.lastFailedLogin 
        ? new Date(user.lastFailedLogin.getTime() + 30 * 60 * 1000) // 30 minutes
        : new Date();
      
      if (new Date() < lockoutExpiry) {
        throw new Error('Account is temporarily locked due to multiple failed login attempts. Please try again later.');
      }
    }

    // Reset failed login attempts
    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: 0,
        lastFailedLogin: null,
        lastLoginAt: new Date(),
      }
    });

    // Generate tokens
    const token = this.generateToken(user);
    const refreshToken = this.generateRefreshToken(user);

    // Create session
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        token,
        refreshToken,
        ipAddress: ipAddress || 'unknown',
        userAgent: userAgent || 'unknown',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      }
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
      token,
      refreshToken,
      sessionId: session.id,
    };
  }

  /**
   * Logout user by invalidating session
   */
  async logout(token: string) {
    await prisma.session.updateMany({
      where: { token },
      data: { revokedAt: new Date() }
    });
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshToken: string) {
    try {
      // Verify refresh token
      jwt.verify(refreshToken, this.JWT_REFRESH_SECRET) as TokenPayload;

      // Find session
      const session = await prisma.session.findFirst({
        where: {
          refreshToken,
          revokedAt: null,
          expiresAt: { gt: new Date() }
        },
        include: { user: true }
      });

      if (!session || session.user.status !== 'ACTIVE') {
        throw new Error('Invalid refresh token');
      }

      // Generate new tokens
      const newToken = this.generateToken(session.user);
      const newRefreshToken = this.generateRefreshToken(session.user);

      // Update session
      await prisma.session.update({
        where: { id: session.id },
        data: {
          token: newToken,
          refreshToken: newRefreshToken,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        }
      });

      return {
        token: newToken,
        refreshToken: newRefreshToken,
      };
    } catch {
      throw new Error('Invalid or expired refresh token');
    }
  }

  /**
   * Verify email with token
   */
  async verifyEmail(token: string) {
    const user = await prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
        // Note: Token expiry checking would need to be implemented differently
      }
    });

    if (!user) {
      throw new Error('Invalid or expired verification token');
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        status: UserStatus.ACTIVE,
        emailVerified: new Date(),  // Set to current date instead of boolean
        emailVerificationToken: null,
      }
    });

    return { message: 'Email verified successfully' };
  }

  /**
   * Request password reset
   */
  async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      // Don't reveal if user exists
      return { message: 'If an account exists, a password reset email has been sent' };
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.passwordReset.create({
      data: {
        email: user.email,  // Schema uses email, not userId
        token: resetToken,
        expiresAt: resetExpires,
      }
    });

    // Send reset email
    try {
      await sendPasswordResetEmail(user.email, user.name || 'User');
    } catch (err) {
      console.error('Failed to send password reset email:', err);
    }

    return { message: 'If an account exists, a password reset email has been sent' };
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string) {
    const passwordReset = await prisma.passwordReset.findFirst({
      where: {
        token,
        expiresAt: { gt: new Date() },
        usedAt: null,
      },
    });

    if (!passwordReset) {
      throw new Error('Invalid or expired reset token');
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: passwordReset.email }
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, this.SALT_ROUNDS);

    // Update password and mark token as used
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { passwordHash }
      }),
      prisma.passwordReset.update({
        where: { id: passwordReset.id },
        data: { usedAt: new Date() }
      }),
      // Revoke all existing sessions
      prisma.session.updateMany({
        where: { userId: user.id },
        data: { revokedAt: new Date() }
      })
    ]);

    return { message: 'Password reset successfully' };
  }

  /**
   * Verify JWT token and return user
   */
  async verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as TokenPayload;

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          status: true,
          avatar: true,
        }
      });

      if (!user || user.status !== 'ACTIVE') {
        throw new Error('Invalid token');
      }

      return user;
    } catch {
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * Generate JWT access token
   */
  private generateToken(user: { id: string; email: string; role: string }): string {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      } as TokenPayload,
      this.JWT_SECRET,
      { expiresIn: this.TOKEN_EXPIRY }
    );
  }

  /**
   * Generate JWT refresh token
   */
  private generateRefreshToken(user: { id: string; email: string; role: string }): string {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      } as TokenPayload,
      this.JWT_REFRESH_SECRET,
      { expiresIn: this.REFRESH_TOKEN_EXPIRY }
    );
  }

  /**
   * Log failed login attempt
   */
  private async logFailedLogin(userId: string, ipAddress?: string) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        failedLoginAttempts: { increment: 1 },
        lastFailedLogin: new Date(),
      }
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId,
        action: 'FAILED_LOGIN',
        ipAddress: ipAddress || 'unknown',
        metadata: { timestamp: new Date().toISOString() }
      }
    });
  }
}

// Export singleton instance
export const authService = new AuthService();
