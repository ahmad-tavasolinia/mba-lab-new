'use client';

import { useMemo, useState } from 'react';
import { Essay } from '@/lib/types';
import { topics } from '@/lib/topics';
import EssayCard from './EssayCard';

export default function EssaysLibrary({ essays }: { essays: Essay[] }) {
  const [query, setQuery] = useState('');
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const usedTopics = topics.filter((t) => essays.some((e) => e.topics.includes(t.slug)));

  const filtered = useMemo(() => {
    return essays.filter((e) => {
      const matchesTopic = activeTopic ? e.topics.includes(activeTopic as any) : true;
      const q = query.trim().toLowerCase();
      const matchesQuery = q
        ? e.title.toLowerCase().includes(q) || e.summary.toLowerCase().includes(q)
        : true;
      return matchesTopic && matchesQuery;
    });
  }, [essays, query, activeTopic]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-rule pb-6 dark:border-dark-rule sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search essays…"
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
          No essays match that search yet.
        </p>
      ) : (
        <div>
          {filtered.map((essay) => (
            <EssayCard key={essay.slug} essay={essay} />
          ))}
        </div>
      )}
    </div>
  );
}
