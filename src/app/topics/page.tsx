import type { Metadata } from 'next';
import Link from 'next/link';
import { topics } from '@/lib/topics';
import { getAllLabEntries } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Topics',
  description: 'Explore MBA Lab by the ideas that connect it.',
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default async function TopicsPage() {
  const labEntries = await getAllLabEntries();

  return (
    <div className="topics-reference-page">
      <section className="topics-reference-hero">
        <img
          className="topics-reference-image"
          src={basePath + '/topcis/topics-room-reference.png'}
          alt=""
          aria-hidden="true"
        />
        <div className="topics-reference-shade" aria-hidden="true" />
        <div className="topics-reference-copy">
          <div className="topics-reference-eyebrow">
            <span>Browse by topic</span>
            <i />
          </div>
          <h1>Topics</h1>
          <p>
            Ideas in MBA Lab rarely stay inside one discipline. Use topics to follow a thread,
            <br />
            strategy into AI, finance into psychology, across entries, essays, and sources.
          </p>
        </div>
      </section>

      <section className="topics-reference-grid" aria-label="Topics">
        <div className="topics-reference-columns">
          {topics.map((topic, index) => {
            const count = labEntries.filter((entry) => entry.topics.includes(topic.slug)).length;
            return (
              <Link key={topic.slug} href={`/topics/${topic.slug}`} className="topics-reference-card">
                <div className="topics-reference-card-top">
                  <span className="topics-reference-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="topics-reference-code">{topic.name === 'Artificial Intelligence' ? 'AI' : topic.name.toUpperCase()}</span>
                </div>
                <h2>{topic.name}</h2>
                <span className="topics-reference-rule" />
                <p>{topic.description}</p>
                <span className="topics-reference-arrow" aria-hidden="true">→</span>
                <span className="sr-only">{count} {count === 1 ? 'piece' : 'pieces'}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
