import { CategorySlug } from './types';

export interface Category {
  slug: CategorySlug;
  name: string;
  code: string; // short monospace code, matching the style of topic codes
  description: string;
}

export const categories: Category[] = [
  {
    slug: 'cases',
    name: 'Cases',
    code: 'CASE',
    description: 'Real-world cases worked cold, then checked against what actually happened.',
  },
  {
    slug: 'essays',
    name: 'Essays',
    code: 'ESSAY',
    description: 'Independent writing that develops a single idea from the ground up.',
  },
  {
    slug: 'projects',
    name: 'Projects',
    code: 'PROJ',
    description: 'Applied work, models, frameworks, and things actually built.',
  },
  {
    slug: 'interviews',
    name: 'Interviews',
    code: 'INTV',
    description: 'Field conversations with people actually doing the work, what they worry about, off the slide deck.',
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
