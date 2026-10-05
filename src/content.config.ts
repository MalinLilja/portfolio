import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One folder per case study: src/content/work/<slug>/index.md, images beside it.
// The ILP case is deliberately not here until ILP approves it (see CLAUDE.md).
const work = defineCollection({
  loader: glob({
    base: './src/content/work',
    pattern: '*/index.md',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: ({ image }) =>
    z.object({
      // Hero title, written as an outcome
      title: z.string(),
      client: z.string(),
      // Position on the home page (ILP's "Coming soon" card always comes first)
      order: z.number(),
      // Colour set from tokens.css: [data-case="<accent>"]
      accent: z.enum(['smartopt', 'qmatic', 'lansforsakringar', 'ziklo']),
      theme: z.enum(['dark', 'light']).default('dark'),
      // One line for the home page card, so recruiters see the result before they click
      summary: z.string(),
      // Search engines and link previews
      description: z.string(),
      tags: z.array(z.string()),
      hero: image(),
      heroAlt: z.string(),
      tldr: z.object({
        company: z.string(),
        role: z.string(),
        timeline: z.string().optional(),
        team: z.string().optional(),
        problem: z.string(),
        whatIDid: z.string(),
        result: z.string().optional(),
      }),
      process: z.array(z.string()).optional(),
      links: z.array(z.object({ label: z.string(), url: z.string().url().or(z.literal('')) })).default([]),
    }),
});

// Home page, profile and CV copy.
const site = defineCollection({
  loader: glob({ base: './src/content/site', pattern: '*.md' }),
  schema: z.object({
    name: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    positioning: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    linkedin: z.string().url().optional(),
    city: z.string().optional(),
    experience: z
      .array(z.object({ role: z.string(), org: z.string(), years: z.string(), work: z.array(z.string()).default([]) }))
      .optional(),
    comingSoon: z.array(z.object({ client: z.string(), summary: z.string(), note: z.string() })).optional(),
    quote: z.object({ text: z.string(), name: z.string(), title: z.string() }).optional(),
    beyondWork: z.string().optional(),
  }),
});

export const collections = { work, site };
