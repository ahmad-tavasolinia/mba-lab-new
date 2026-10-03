import Link from 'next/link';
import { Essay } from '@/lib/types';
import { TopicChip, formatDate } from './ui';

export default function EssayCard({ essay }: { essay: Essay }) {
  return (
    <Link
      href={`/essays/${essay.slug}`}
      className="group block border-t border-rule py-8 first:border-t-0 dark:border-dark-rule"
    >
      <span className="font-mono text-[11px] uppercase tracking-widest text-ink/40 dark:text-dark-soft/60">
        {formatDate(essay.date)} · {essay.readingTime}
      </span>
      <h3 className="mt-3 font-serif text-2xl font-medium text-ink transition-colors group-hover:text-gold dark:text-dark-ink md:text-[1.75rem]">
        {essay.title}
      </h3>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink/60 dark:text-dark-soft">
        {essay.summary}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {essay.topics.map((t) => (
          <TopicChip key={t} slug={t} />
        ))}
      </div>
    </Link>
  );
}
