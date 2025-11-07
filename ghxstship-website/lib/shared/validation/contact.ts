/**
 * Contact Form & Newsletter Validation Schemas
 */

import { z } from 'zod';

// ============================================================================
// CONTACT FORM VALIDATIONS
// ============================================================================

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().max(100).optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  formType: z.enum([
    'GENERAL_INQUIRY',
    'PROJECT_INQUIRY',
    'PARTNERSHIP',
    'PRESS',
    'CAREERS',
    'SUPPORT',
  ]).default('GENERAL_INQUIRY'),
  projectType: z.string().max(100).optional(),
  projectBudget: z.enum([
    'UNDER_50K',
    'RANGE_50K_100K',
    'RANGE_100K_250K',
    'RANGE_250K_500K',
    'OVER_500K',
    'NOT_SPECIFIED',
  ]).optional(),
  projectTimeline: z.string().max(200).optional(),
  projectDescription: z.string().max(2000).optional(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ============================================================================
// NEWSLETTER SUBSCRIPTION
// ============================================================================

export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2).max(100).optional(),
  interests: z.array(z.string()).optional(),
  frequency: z.enum(['daily', 'weekly', 'monthly']).optional(),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

// ============================================================================
// ANALYTICS VALIDATIONS
// ============================================================================

export const analyticsEventSchema = z.object({
  eventType: z.enum([
    'PAGE_VIEW',
    'PROJECT_VIEW',
    'BLOG_VIEW',
    'FORM_SUBMISSION',
    'DOWNLOAD',
    'VIDEO_PLAY',
    'LINK_CLICK',
    'SEARCH',
    'ERROR',
  ]),
  eventName: z.string().max(100),
  path: z.string().optional(),
  properties: z.record(z.string(), z.any()).optional(),
});

export type AnalyticsEventData = z.infer<typeof analyticsEventSchema>;
