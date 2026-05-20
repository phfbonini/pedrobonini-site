import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    category: z.enum(['ai-agents', 'engineering', 'career', 'personal']),
    lang: z.enum(['en', 'pt']).default('en'),
    series: z.string().optional(),
    part: z.number().optional(),
    draft: z.boolean().default(false),
    coverImage: z.string().optional(),
  }),
});

const series = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['ongoing', 'completed', 'paused']),
    startDate: z.coerce.date(),
    lang: z.enum(['en', 'pt']).default('en'),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    stack: z.array(z.string()),
    repoUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    year: z.number(),
    featured: z.boolean().default(false),
    lang: z.enum(['en', 'pt']).default('en'),
  }),
});

export const collections = { posts, series, projects };
