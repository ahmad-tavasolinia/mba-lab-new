import { Topic } from './types';

export const topics: Topic[] = [
  {
    slug: 'strategy',
    name: 'Strategy',
    code: 'STRAT',
    description:
      'How advantage is built, defended, and eventually lost, and what that reveals about the nature of competition itself.',
  },
  {
    slug: 'finance',
    name: 'Finance',
    code: 'FIN',
    description:
      'The mechanics and psychology of capital: how it is priced, allocated, and misunderstood.',
  },
  {
    slug: 'marketing',
    name: 'Marketing',
    code: 'MKT',
    description: 'How value gets communicated, positioned, and made desirable in the mind of the customer.',
  },
  {
    slug: 'entrepreneurship',
    name: 'Entrepreneurship',
    code: 'ENTR',
    description:
      'Building under uncertainty, how opportunity is recognized, tested, and turned into an organization.',
  },
  {
    slug: 'artificial-intelligence',
    name: 'Artificial Intelligence',
    code: 'AI',
    description:
      'How AI is changing the cost of building things, the value of expertise, and what a competitive advantage even is.',
  },
];

export function getTopic(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}
