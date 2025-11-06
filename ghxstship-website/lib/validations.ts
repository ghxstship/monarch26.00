/**
 * Validation Schemas using Zod
 * Comprehensive input validation for all API endpoints
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
// AUTHENTICATION VALIDATIONS
// ============================================================================

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

export type LoginData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain uppercase, lowercase, number, and special character'
    ),
  name: z.string().min(2).max(100),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type RegisterData = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain uppercase, lowercase, number, and special character'
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

// ============================================================================
// PROJECT/CASE STUDY VALIDATIONS
// ============================================================================

export const projectSchema = z.object({
  title: z.string().min(3).max(200),
  subtitle: z.string().max(300).optional(),
  description: z.string().max(5000).optional(),
  content: z.string().optional(),
  excerpt: z.string().max(500).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  vertical: z.enum([
    'IMMERSIVE_ENTERTAINMENT',
    'EXPERIENTIAL_MARKETING',
    'CREATIVE_MEDIA',
    'INTEGRATED_TECHNOLOGY',
  ]),
  services: z.array(z.enum(['DESIGN', 'DEVELOPMENT', 'DIRECTION', 'DISRUPTION'])),
  client: z.string().max(100).optional(),
  location: z.string().max(100).optional(),
  year: z.number().int().min(2000).max(2100).optional(),
  challenge: z.string().max(2000).optional(),
  solution: z.string().max(2000).optional(),
  results: z.string().max(2000).optional(),
  technologies: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  metaKeywords: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
});

export type ProjectData = z.infer<typeof projectSchema>;

// ============================================================================
// BLOG POST VALIDATIONS
// ============================================================================

export const blogPostSchema = z.object({
  title: z.string().min(3).max(200),
  subtitle: z.string().max(300).optional(),
  content: z.string().min(50),
  excerpt: z.string().max(500).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  category: z.enum([
    'COMPANY_NEWS',
    'PROJECT_ANNOUNCEMENT',
    'INDUSTRY_INSIGHTS',
    'TECHNOLOGY',
    'BEHIND_THE_SCENES',
    'PRESS_RELEASE',
  ]),
  tags: z.array(z.string()).optional(),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  featured: z.boolean().default(false),
});

export type BlogPostData = z.infer<typeof blogPostSchema>;

// ============================================================================
// COMMENT VALIDATIONS
// ============================================================================

export const commentSchema = z.object({
  content: z.string().min(3).max(1000),
  projectId: z.string().optional(),
  blogPostId: z.string().optional(),
  parentId: z.string().optional(),
  guestName: z.string().min(2).max(100).optional(),
  guestEmail: z.string().email().optional(),
}).refine(
  (data) => data.projectId || data.blogPostId,
  'Either projectId or blogPostId must be provided'
);

export type CommentData = z.infer<typeof commentSchema>;

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

// ============================================================================
// QUERY PARAMETER VALIDATIONS
// ============================================================================

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export type PaginationParams = z.infer<typeof paginationSchema>;

export const projectFilterSchema = paginationSchema.extend({
  vertical: z.enum([
    'IMMERSIVE_ENTERTAINMENT',
    'EXPERIENTIAL_MARKETING',
    'CREATIVE_MEDIA',
    'INTEGRATED_TECHNOLOGY',
  ]).optional(),
  service: z.enum(['DESIGN', 'DEVELOPMENT', 'DIRECTION', 'DISRUPTION']).optional(),
  year: z.coerce.number().int().optional(),
  featured: z.coerce.boolean().optional(),
  search: z.string().optional(),
  sortBy: z.enum(['createdAt', 'publishedAt', 'title', 'viewCount']).default('publishedAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type ProjectFilterParams = z.infer<typeof projectFilterSchema>;

export const blogFilterSchema = paginationSchema.extend({
  category: z.enum([
    'COMPANY_NEWS',
    'PROJECT_ANNOUNCEMENT',
    'INDUSTRY_INSIGHTS',
    'TECHNOLOGY',
    'BEHIND_THE_SCENES',
    'PRESS_RELEASE',
  ]).optional(),
  tag: z.string().optional(),
  search: z.string().optional(),
  sortBy: z.enum(['createdAt', 'publishedAt', 'title', 'viewCount']).default('publishedAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type BlogFilterParams = z.infer<typeof blogFilterSchema>;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Sanitize HTML input to prevent XSS attacks
 */
export function sanitizeHtml(html: string): string {
  // Basic sanitization - in production, use a library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
}

/**
 * Validate and sanitize user input
 */
export function sanitizeInput(input: string): string {
  return input.trim().substring(0, 10000); // Limit length
}

/**
 * Generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
