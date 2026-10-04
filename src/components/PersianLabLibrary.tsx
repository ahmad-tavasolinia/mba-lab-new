'use client';

import Link from 'next/link';
import { useId, useMemo, useState } from 'react';

type PersianTopic = { slug: string; name: string };

type PersianLabItem = {
  href: string;
  code: string;
  date: string;
  title: string;
  summary: string;
  searchText: string;
  topics: PersianTopic[];
};

export default function PersianLabLibrary({
  items,
  topicOptions,
}: {
  items: PersianLabItem[];
  topicOptions: PersianTopic[];
}) {
  const [query, setQuery] = useState('');
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const searchId = useId();

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return items.filter((item) => {
      const matchesTopic = !activeTopic || item.topics.some((topic) => topic.slug === activeTopic);
      const matchesQuery = !normalizedQuery ||
        `${item.title} ${item.summary} ${item.searchText} ${item.topics.map((topic) => topic.name).join(' ')}`
          .toLocaleLowerCase()
          .includes(normalizedQuery);
      return matchesTopic && matchesQuery;
    });
  }, [items, query, activeTopic]);

  return (
    <div className="fa-library">
      <div className="fa-library-controls">
        <label className="sr-only" htmlFor={searchId}>جست‌وجو در یادداشت‌ها</label>
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="جست‌وجو در یادداشت‌ها..."
          className="fa-library-search"
          dir="rtl"
        />
        <div className="fa-library-topics" role="group" aria-label="فیلتر بر اساس موضوع">
          <button
            type="button"
            aria-pressed={activeTopic === null}
            className={activeTopic === null ? 'fa-filter-chip is-active' : 'fa-filter-chip'}
            onClick={() => setActiveTopic(null)}
          >
            همه
          </button>
          {topicOptions.map((topic) => (
            <button
              key={topic.slug}
              type="button"
              aria-pressed={activeTopic === topic.slug}
              className={activeTopic === topic.slug ? 'fa-filter-chip is-active' : 'fa-filter-chip'}
              onClick={() => setActiveTopic((current) => current === topic.slug ? null : topic.slug)}
            >
              {topic.name}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="fa-library-empty">یادداشتی با این جست‌وجو پیدا نشد.</p>
      ) : (
        <div className="fa-entry-list fa-library-results" aria-live="polite">
          {filtered.map((item) => (
            <Link key={item.href} href={item.href} className="fa-entry-card">
              <span className="fa-meta">
                <bdi dir="ltr">{item.code}</bdi>
                <time>{item.date}</time>
              </span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <span className="fa-entry-topics">
                {item.topics.map((topic) => (
                  <span key={topic.slug} className="fa-entry-topic">{topic.name}</span>
                ))}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
