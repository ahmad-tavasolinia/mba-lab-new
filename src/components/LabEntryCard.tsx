import Link from 'next/link';
import { LabEntry } from '@/lib/types';
import { CodeChip, TopicChip, formatDate } from './ui';

export default function LabEntryCard({ entry }: { entry: LabEntry }) {
  const caseLogo = entry.category === 'cases' ? entry.logo : undefined;

  return (
    <Link
      href={`/mba-lab/${entry.slug}`}
      className="group block border-t border-rule py-8 first:border-t-0 dark:border-dark-rule"
    >
      <div className={caseLogo ? 'flex items-center gap-5' : undefined}>
        {caseLogo && (
          <span className="case-card-logo" aria-hidden="true">
            <img
              src={caseLogo}
              alt=""
              className="case-card-logo-image"
              loading="lazy"
            />
          </span>
        )}
        <div className={caseLogo ? 'min-w-0 flex-1' : undefined}>
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
        </div>
      </div>
    </Link>
  );
}
