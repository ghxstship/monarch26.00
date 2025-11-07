/**
 * Content Validation Schemas (Projects, Blog Posts, Comments)
 */

import { z } from 'zod';

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
