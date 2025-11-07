/**
 * Storage Service
 * Handles file uploads to AWS S3 and media management
 */

import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { prisma } from '@/lib/infrastructure/database';
import { MediaType } from '@prisma/client';

export class StorageService {
  private s3Client: S3Client | null = null;
  private bucket: string;
  private region: string;
  private cdnUrl: string;

  constructor() {
    this.bucket = process.env.AWS_S3_BUCKET || '';
    this.region = process.env.AWS_REGION || 'us-east-1';
    this.cdnUrl = process.env.NEXT_PUBLIC_CDN_URL || '';

    // Only initialize S3 if credentials are provided
    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
      this.s3Client = new S3Client({
        region: this.region,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      });
    }
  }

  /**
   * Upload file to S3
   */
  async uploadFile(file: Buffer, params: {
    filename: string;
    contentType: string;
    folder?: string;
    userId: string;
  }) {
    if (!this.s3Client) {
      throw new Error('S3 client not configured');
    }

    const key = params.folder 
      ? `${params.folder}/${Date.now()}-${params.filename}`
      : `${Date.now()}-${params.filename}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file,
      ContentType: params.contentType,
    });

    await this.s3Client.send(command);

    const url = this.cdnUrl 
      ? `${this.cdnUrl}/${key}`
      : `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;

    // Determine media type from MIME type
    const mediaType = params.contentType.startsWith('image/') ? 'IMAGE' :
                     params.contentType.startsWith('video/') ? 'VIDEO' :
                     params.contentType.startsWith('audio/') ? 'AUDIO' :
                     params.contentType.includes('pdf') || params.contentType.includes('document') ? 'DOCUMENT' :
                     'OTHER';

    // Save to database
    const media = await prisma.media.create({
      data: {
        filename: params.filename,
        originalName: params.filename,  // Required field
        url,
        mimeType: params.contentType,
        size: file.length,
        type: mediaType as MediaType,  // MediaType enum
        // Note: uploadedById and metadata fields don't exist in Media schema
        // Key and bucket info stored in URL
      }
    });

    return media;
  }

  /**
   * Delete file from S3
   */
  async deleteFile(mediaId: string) {
    if (!this.s3Client) {
      throw new Error('S3 client not configured');
    }

    const media = await prisma.media.findUnique({
      where: { id: mediaId }
    });

    if (!media) {
      throw new Error('Media not found');
    }

    // Extract key from URL since metadata field doesn't exist
    const key = media.url.split('/').pop() || media.filename;

    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    await this.s3Client.send(command);

    // Delete from database
    await prisma.media.delete({
      where: { id: mediaId }
    });

    return { message: 'File deleted successfully' };
  }

  /**
   * Get signed URL for private file access
   */
  async getSignedUrl(mediaId: string, expiresIn = 3600) {
    if (!this.s3Client) {
      throw new Error('S3 client not configured');
    }

    const media = await prisma.media.findUnique({
      where: { id: mediaId }
    });

    if (!media) {
      throw new Error('Media not found');
    }

    // Extract key from URL since metadata field doesn't exist
    const key = media.url.split('/').pop() || media.filename;

    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    const url = await getSignedUrl(this.s3Client, command, { expiresIn });

    return { url, expiresIn };
  }

  /**
   * List media files
   */
  async listMedia(params: {
    page?: number;
    limit?: number;
    mimeType?: string;
    userId?: string;
  }) {
    const page = params.page || 1;
    const limit = params.limit || 50;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (params.mimeType) {
      where.mimeType = { startsWith: params.mimeType };
    }

    if (params.userId) {
      where.uploadedById = params.userId;
    }

    const [media, total] = await Promise.all([
      prisma.media.findMany({
        where,
        skip,
        take: limit,
        // Note: uploadedBy relation doesn't exist in Media model
        orderBy: { createdAt: 'desc' }
      }),
      prisma.media.count({ where })
    ]);

    return {
      media,
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
   * Get media statistics
   */
  async getMediaStats() {
    const [total, totalSize, byType] = await Promise.all([
      prisma.media.count(),
      prisma.media.aggregate({
        _sum: { size: true }
      }),
      prisma.media.groupBy({
        by: ['mimeType'],
        _count: true,
        _sum: { size: true }
      })
    ]);

    return {
      total,
      totalSize: totalSize._sum.size || 0,
      byType: byType.map(item => ({
        mimeType: item.mimeType,
        count: item._count,
        size: item._sum.size || 0,
      }))
    };
  }

  /**
   * Validate file before upload
   */
  validateFile(file: { size: number; type: string }, options?: {
    maxSize?: number;
    allowedTypes?: string[];
  }) {
    const maxSize = options?.maxSize || 10 * 1024 * 1024; // 10MB default
    const allowedTypes = options?.allowedTypes || [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
    ];

    if (file.size > maxSize) {
      throw new Error(`File size exceeds maximum of ${maxSize / 1024 / 1024}MB`);
    }

    if (!allowedTypes.includes(file.type)) {
      throw new Error(`File type ${file.type} is not allowed`);
    }

    return true;
  }
}

// Export singleton instance
export const storageService = new StorageService();
