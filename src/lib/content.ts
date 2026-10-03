import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import readingTime from 'reading-time';
import {
  LabEntry,
  LabEntryFrontmatter,
  Essay,
  EssayFrontmatter,
  Source,
  SourceFrontmatter,
} from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const LAB_DIR = path.join(CONTENT_DIR, 'lab');
const ESSAYS_DIR = path.join(CONTENT_DIR, 'essays');
const SOURCES_DIR = path.join(CONTENT_DIR, 'sources');

function slugsIn(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

async function toHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(markdown);
  return result.toString();
}

export function getLabSlugs(): string[] {
  return slugsIn(LAB_DIR);
}

export async function getLabEntry(slug: string): Promise<LabEntry> {
  const fullPath = path.join(LAB_DIR, `${slug}.md`);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);
  const contentHtml = await toHtml(content);
  const stats = readingTime(content);
  return {
    slug,
    ...(data as LabEntryFrontmatter),
    contentHtml,
    readingTime: stats.text,
  };
}

export async function getAllLabEntries(): Promise<LabEntry[]> {
  const slugs = getLabSlugs();
  const entries = await Promise.all(slugs.map((s) => getLabEntry(s)));
  return entries.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getEssaySlugs(): string[] {
  return slugsIn(ESSAYS_DIR);
}

export async function getEssay(slug: string): Promise<Essay> {
  const fullPath = path.join(ESSAYS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);
  const contentHtml = await toHtml(content);
  const stats = readingTime(content);
  return {
    slug,
    ...(data as EssayFrontmatter),
    contentHtml,
    readingTime: stats.text,
  };
}

export async function getAllEssays(): Promise<Essay[]> {
  const slugs = getEssaySlugs();
  const entries = await Promise.all(slugs.map((s) => getEssay(s)));
  return entries.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getSourceSlugs(): string[] {
  return slugsIn(SOURCES_DIR);
}

export function getSource(slug: string): Source {
  const fullPath = path.join(SOURCES_DIR, `${slug}.md`);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(raw);
  return { slug, ...(data as SourceFrontmatter) };
}

export function getAllSources(): Source[] {
  return getSourceSlugs().map((s) => getSource(s));
}
