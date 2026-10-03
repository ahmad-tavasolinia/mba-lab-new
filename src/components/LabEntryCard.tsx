import Link from 'next/link';
import { LabEntry } from '@/lib/types';
import { CodeChip, TopicChip, formatDate } from './ui';

export default function LabEntryCard({ entry }: { entry: LabEntry }) {
  return (
    <Link
      href={`/mba-lab/${entry.slug}`}
      className="group block border-t border-rule py-8 first:border-t-0 dark:border-dark-rule"
    >
      <div className="flex flex-wrap items-center gap-3">
        <CodeChip>{entry.code}</CodeChip>
        <span className="font-mono text-[11px] uppercase tracking-widest text-ink/40 dark:text-dark-soft/60">
          {formatDate(entry.date)}
        </span>
      </div>
      <h3 className="mt-3 font-serif text-2xl font-medium text-ink transition-colors group-hover:text-gold dark:text-dark-ink md:text-[1.75rem]">
        {entry.title}
      </h3>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink/60 dark:text-dark-soft">
        {entry.summary}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {entry.topics.map((t) => (
          <TopicChip key={t} slug={t} />
        ))}
      </div>
    </Link>
  );
}
