/**
 * Media Upload Endpoint
 * POST /api/media/upload - Upload file to S3
 */

import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/infrastructure/middleware';
import { storageService } from '@/lib/core/services/storage';

export const POST = withAuth(async (request: NextRequest, user) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string | null;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Validate file
    storageService.validateFile({
      size: file.size,
      type: file.type,
    });
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Upload to S3
    const media = await storageService.uploadFile(buffer, {
      filename: file.name,
      contentType: file.type,
      folder: folder || undefined,
      userId: user.id,
    });
    
    return NextResponse.json({
      success: true,
      media,
    }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to upload file';
    const status = message.includes('not configured') ? 503 : 
                   message.includes('exceeds') || message.includes('not allowed') ? 400 : 500;
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
});

// Note: bodyParser config is not needed in App Router - Next.js handles formData automatically
