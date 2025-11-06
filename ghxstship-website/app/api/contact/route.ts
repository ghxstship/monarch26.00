/**
 * Contact Form API Endpoint
 * Handles contact form submissions with validation, spam protection, and email notifications
 */

import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations';
import { prisma } from '@/lib/db';
import { sendContactEmail } from '@/lib/email';
import { z } from 'zod';

// Rate limiting map (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60000 }); // 1 minute window
    return true;
  }

  if (limit.count >= 5) {
    // Max 5 requests per minute
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get IP address for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

    // Basic spam detection
    const spamKeywords = ['viagra', 'casino', 'lottery', 'crypto'];
    const messageContent = `${validatedData.message} ${validatedData.subject || ''}`.toLowerCase();
    const isSpam = spamKeywords.some(keyword => messageContent.includes(keyword));

    // Get metadata
    const userAgent = request.headers.get('user-agent') || undefined;
    const referrer = request.headers.get('referer') || undefined;

    // Save to database
    const submission = await prisma.contactSubmission.create({
      data: {
        ...validatedData,
        status: isSpam ? 'SPAM' : 'NEW',
        ipAddress: ip,
        userAgent,
        referrer,
      },
    });

    // Send email notification (only if not spam)
    if (!isSpam) {
      try {
        await sendContactEmail({
          to: process.env.CONTACT_EMAIL || 'hello@ghxstship.com',
          from: validatedData.email,
          name: validatedData.name,
          subject: validatedData.subject || 'New Contact Form Submission',
          message: validatedData.message,
          formType: validatedData.formType,
          metadata: {
            company: validatedData.company,
            phone: validatedData.phone,
            projectType: validatedData.projectType,
            projectBudget: validatedData.projectBudget,
            projectTimeline: validatedData.projectTimeline,
          },
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message. We will get back to you soon!',
        submissionId: submission.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

// OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
