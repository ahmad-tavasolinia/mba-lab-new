// Each "key" (topic or category) gets one accent color from the site's
// cool blue palette and its related slate-blue shades.
// Classes are written out in full (not interpolated) so Tailwind's JIT
// scanner can find them at build time.

export interface KeyColorClasses {
  code: string; // small mono code label at the top of the card
  border: string; // card border, always visible
  bg: string; // subtle background tint, always visible
  hoverBorder: string; // card border, hover state (stronger)
  hoverTitle: string; // card title color on hover
  badge: string; // pill/chip used on the entry's own detail page
}

const chocolate: KeyColorClasses = {
  code: 'text-chocolate dark:text-chocolate-bright',
  border: 'border-chocolate/35 dark:border-chocolate-bright/35',
  bg: 'bg-chocolate/[0.04] dark:bg-chocolate-bright/[0.06]',
  hoverBorder: 'hover:border-chocolate dark:hover:border-chocolate-bright',
  hoverTitle: 'group-hover:text-chocolate dark:group-hover:text-chocolate-bright',
  badge:
    'border-chocolate/40 bg-chocolate/5 text-chocolate dark:border-chocolate-bright/40 dark:bg-chocolate-bright/10 dark:text-chocolate-bright',
};

const caramel: KeyColorClasses = {
  code: 'text-caramel dark:text-caramel-bright',
  border: 'border-caramel/35 dark:border-caramel-bright/35',
  bg: 'bg-caramel/[0.04] dark:bg-caramel-bright/[0.06]',
  hoverBorder: 'hover:border-caramel dark:hover:border-caramel-bright',
  hoverTitle: 'group-hover:text-caramel dark:group-hover:text-caramel-bright',
  badge:
    'border-caramel/40 bg-caramel/5 text-caramel dark:border-caramel-bright/40 dark:bg-caramel-bright/10 dark:text-caramel-bright',
};

const gold: KeyColorClasses = {
  code: 'text-gold dark:text-gold-bright',
  border: 'border-gold/35 dark:border-gold-bright/35',
  bg: 'bg-gold/[0.04] dark:bg-gold-bright/[0.06]',
  hoverBorder: 'hover:border-gold dark:hover:border-gold-bright',
  hoverTitle: 'group-hover:text-gold dark:group-hover:text-gold-bright',
  badge:
    'border-gold/40 bg-gold/5 text-gold dark:border-gold-bright/40 dark:bg-gold-bright/10 dark:text-gold-bright',
};

const cognac: KeyColorClasses = {
  code: 'text-cognac dark:text-cognac-bright',
  border: 'border-cognac/35 dark:border-cognac-bright/35',
  bg: 'bg-cognac/[0.04] dark:bg-cognac-bright/[0.06]',
  hoverBorder: 'hover:border-cognac dark:hover:border-cognac-bright',
  hoverTitle: 'group-hover:text-cognac dark:group-hover:text-cognac-bright',
  badge:
    'border-cognac/40 bg-cognac/5 text-cognac dark:border-cognac-bright/40 dark:bg-cognac-bright/10 dark:text-cognac-bright',
};

const camel: KeyColorClasses = {
  code: 'text-camel dark:text-camel-bright',
  border: 'border-camel/35 dark:border-camel-bright/35',
  bg: 'bg-camel/[0.04] dark:bg-camel-bright/[0.06]',
  hoverBorder: 'hover:border-camel dark:hover:border-camel-bright',
  hoverTitle: 'group-hover:text-camel dark:group-hover:text-camel-bright',
  badge:
    'border-camel/40 bg-camel/5 text-camel dark:border-camel-bright/40 dark:bg-camel-bright/10 dark:text-camel-bright',
};

const coffee: KeyColorClasses = {
  code: 'text-coffee dark:text-coffee-bright',
  border: 'border-coffee/35 dark:border-coffee-bright/35',
  bg: 'bg-coffee/[0.04] dark:bg-coffee-bright/[0.06]',
  hoverBorder: 'hover:border-coffee dark:hover:border-coffee-bright',
  hoverTitle: 'group-hover:text-coffee dark:group-hover:text-coffee-bright',
  badge:
    'border-coffee/40 bg-coffee/5 text-coffee dark:border-coffee-bright/40 dark:bg-coffee-bright/10 dark:text-coffee-bright',
};

export const topicColors: Record<string, KeyColorClasses> = {
  strategy: cognac,
  finance: chocolate,
  marketing: caramel,
  entrepreneurship: coffee,
  'artificial-intelligence': gold,
};

export const categoryColors: Record<string, KeyColorClasses> = {
  cases: cognac,
  essays: gold,
  projects: chocolate,
  interviews: caramel,
};

const fallback: KeyColorClasses = gold;

export function getTopicColor(slug: string): KeyColorClasses {
  return topicColors[slug] ?? fallback;
}

export function getCategoryColor(slug: string): KeyColorClasses {
  return categoryColors[slug] ?? fallback;
}
