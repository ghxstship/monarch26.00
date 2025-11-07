/**
 * Newsletter Subscription API Endpoint
 */

import { NextRequest, NextResponse } from 'next/server';
import { newsletterSchema } from '@/lib/shared/validation';
import { prisma } from '@/lib/infrastructure/database';
import { sendWelcomeEmail } from '@/lib/features/email';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = newsletterSchema.parse(body);

    // Check if already subscribed
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: validatedData.email },
    });

    if (existing) {
      if (existing.status === 'active') {
        return NextResponse.json(
          { error: 'This email is already subscribed.' },
          { status: 409 }
        );
      }
      
      // Reactivate if previously unsubscribed
      await prisma.newsletterSubscriber.update({
        where: { email: validatedData.email },
        data: {
          status: 'active',
          name: validatedData.name || existing.name,
          interests: validatedData.interests || existing.interests,
          frequency: validatedData.frequency || existing.frequency,
          subscribedAt: new Date(),
          unsubscribedAt: null,
        },
      });
    } else {
      // Create new subscriber
      const ip = request.headers.get('x-forwarded-for') || 
                 request.headers.get('x-real-ip') || 
                 undefined;
      const userAgent = request.headers.get('user-agent') || undefined;

      await prisma.newsletterSubscriber.create({
        data: {
          ...validatedData,
          ipAddress: ip,
          userAgent,
          confirmedAt: new Date(), // Auto-confirm for now
        },
      });
    }

    // Send welcome email
    try {
      await sendWelcomeEmail(
        validatedData.email,
        validatedData.name || 'there'
      );
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to newsletter!',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);

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
