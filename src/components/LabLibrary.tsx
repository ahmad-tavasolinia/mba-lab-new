'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { LabEntry } from '@/lib/types';
import { topics } from '@/lib/topics';
import LabEntryCard from './LabEntryCard';

export default function LabLibrary({
  entries,
  initialVisibleCount,
}: {
  entries: LabEntry[];
  initialVisibleCount?: number;
}) {
  const [query, setQuery] = useState('');
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount ?? entries.length);
  const listId = useId();

  const usedTopics = topics.filter((t) => entries.some((e) => e.topics.includes(t.slug)));

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      const matchesTopic = activeTopic ? e.topics.includes(activeTopic as any) : true;
      const q = query.trim().toLowerCase();
      const matchesQuery = q
        ? e.title.toLowerCase().includes(q) ||
          e.summary.toLowerCase().includes(q) ||
          e.centralQuestion.toLowerCase().includes(q)
        : true;
      return matchesTopic && matchesQuery;
    });
  }, [entries, query, activeTopic]);

  useEffect(() => {
    setVisibleCount(initialVisibleCount ?? entries.length);
  }, [query, activeTopic, initialVisibleCount, entries.length]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-rule pb-6 dark:border-dark-rule sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lab notes…"
            className="w-full rounded-full border border-rule bg-transparent px-4 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-gold dark:border-dark-rule dark:text-dark-ink dark:placeholder:text-dark-soft/50"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTopic(null)}
            className={`rounded-full border px-3 py-1 text-[11px] font-medium transition ${
              activeTopic === null
                ? 'border-gold bg-gold/10 text-gold'
                : 'border-rule text-ink/50 hover:border-gold hover:text-gold dark:border-dark-rule dark:text-dark-soft'
            }`}
          >
            All
          </button>
          {usedTopics.map((t) => (
            <button
              key={t.slug}
              onClick={() => setActiveTopic(t.slug === activeTopic ? null : t.slug)}
              className={`rounded-full border px-3 py-1 text-[11px] font-medium transition ${
                activeTopic === t.slug
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-rule text-ink/50 hover:border-gold hover:text-gold dark:border-dark-rule dark:text-dark-soft'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-sm text-ink/50 dark:text-dark-soft">
          No lab notes match that search yet.
        </p>
      ) : (
        <div id={listId}>
          {filtered.slice(0, visibleCount).map((entry) => (
            <LabEntryCard key={entry.slug} entry={entry} />
          ))}
          {initialVisibleCount !== undefined && filtered.length > initialVisibleCount && (
            <button
              type="button"
              className="lab-library-more"
              aria-controls={listId}
              aria-expanded={visibleCount > initialVisibleCount}
              onClick={() =>
                setVisibleCount((count) =>
                  count >= filtered.length
                    ? initialVisibleCount
                    : Math.min(count + 3, filtered.length),
                )
              }
            >
              {visibleCount >= filtered.length ? 'Show less' : 'Load more'}
              <span aria-hidden="true">{visibleCount >= filtered.length ? '↑' : '↓'}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
