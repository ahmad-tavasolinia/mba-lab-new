export type TopicSlug = 'strategy' | 'finance' | 'marketing' | 'entrepreneurship' | 'artificial-intelligence';
export type CategorySlug = 'cases' | 'essays' | 'projects' | 'interviews';
export type PhaseSlug = 'phase-1' | 'phase-2' | 'phase-3';

export interface Topic {
  slug: TopicSlug;
  name: string;
  code: string; // short monospace code, e.g. STRAT
  description: string;
}

export interface LabEntryFrontmatter {
  title: string;
  date: string;
  code: string; // e.g. "MBA·STRAT·04"
  journeyPhase: PhaseSlug; // where this entry falls in the pre-MBA / during / post-MBA journey
  category: CategorySlug; // Cases, Essays, or Projects, the "key" this entry lives under
  topics: TopicSlug[];
  summary: string;
  centralQuestion: string;
  keyIdeas: string[];
  connections: string[];
  openQuestions: string[];
  finalPerspective: string;
  sources: string[]; // source slugs
  projectType?: string;
  practice?: string[];
  screenshots?: { src: string; alt: string; caption: string }[];
  download?: { label: string; href: string };
}

export interface LabEntry extends LabEntryFrontmatter {
  slug: string;
  contentHtml: string;
  readingTime: string;
}

export interface EssayFrontmatter {
  title: string;
  date: string;
  topics: TopicSlug[];
  summary: string;
  standalone?: boolean;
}

export interface Essay extends EssayFrontmatter {
  slug: string;
  contentHtml: string;
  readingTime: string;
}

export interface SourceFrontmatter {
  institution: string;
  course: string;
  courseUrl?: string;
  instructor?: string;
  instructorUrl?: string;
  subject: TopicSlug;
  why: string;
  outputs: string[]; // lab entry slugs
}

export interface Source extends SourceFrontmatter {
  slug: string;
}
