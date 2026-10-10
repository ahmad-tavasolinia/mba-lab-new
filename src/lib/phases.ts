import { PhaseSlug } from './types';

export interface Phase {
  slug: PhaseSlug;
  name: string; // short label, used in the visual and nav links, e.g. "Pre-MBA"
  fullLabel: string; // e.g. "Phase 01", used in the hero log line ("... Phase 01 in progress")
  pageTitle: string; // e.g. "Phase 01, Pre-MBA", used as the heading on the phase's own page
  description: string; // shown on the phase's own page
}

export const phases: Phase[] = [
  {
    slug: 'phase-1',
    name: 'Pre-MBA',
    fullLabel: 'Phase 01',
    pageTitle: 'Phase 01, Pre-MBA',
    description:
      'Independent study before the program starts, cases and ideas worked cold, entirely on my own.',
  },
  {
    slug: 'phase-2',
    name: 'During MBA',
    fullLabel: 'Phase 02',
    pageTitle: 'Phase 02, During MBA',
    description:
      'Coursework, case discussions, and projects built while actually in the program.',
  },
  {
    slug: 'phase-3',
    name: 'Post-MBA',
    fullLabel: 'Phase 03',
    pageTitle: 'Phase 03, Post-MBA',
    description: 'Applied work after graduation, where the thinking gets tested in the real world.',
  },
];

// ---------------------------------------------------------------------------
// UPDATE THIS as you move through the journey, it's the only thing you need
// to change. Set it to 'phase-2' the day your MBA starts, and 'phase-3' the
// day you graduate. Everything else (the homepage chart, the hero log line,
// which circles look "done") reads from this single value.
// ---------------------------------------------------------------------------
export const activePhase: PhaseSlug = 'phase-1';

export function getPhase(slug: string): Phase | undefined {
  return phases.find((p) => p.slug === slug);
}

export function getPhaseStatus(slug: PhaseSlug): 'complete' | 'active' | 'upcoming' {
  const order: PhaseSlug[] = ['phase-1', 'phase-2', 'phase-3'];
  const activeIndex = order.indexOf(activePhase);
  const thisIndex = order.indexOf(slug);
  if (thisIndex < activeIndex) return 'complete';
  if (thisIndex === activeIndex) return 'active';
  return 'upcoming';
}
