import Link from 'next/link';
import { getAllSources, getAllLabEntries, getAllEssays } from '@/lib/content';
import { getTopic } from '@/lib/topics';
import { Container } from '@/components/ui';
import SourceFlow from '@/components/SourceFlow';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Library',
  description: 'The academic sources behind MBA Lab, and what emerged from studying them.',
  path: '/courses/',
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default async function CoursesPage() {
  const sources = getAllSources();
  const [labEntries, essays] = await Promise.all([getAllLabEntries(), getAllEssays()]);

  return (
    <div className="library-reference-page topics-reference-page">
      <section className="topics-reference-hero library-reference-hero">
        <img
          className="topics-reference-image"
          src={basePath + '/library/library-room-reference.png'}
          alt=""
          aria-hidden="true"
        />
        <div className="topics-reference-shade" aria-hidden="true" />
        <div className="topics-reference-copy">
          <div className="topics-reference-eyebrow">
            <span>Where the ideas come from</span>
            <i />
          </div>
          <h1>Library</h1>
          <p>
            A record of what I study, and what comes out of studying it.
          </p>
        </div>
      </section>

      <section className="topics-reference-grid library-reference-content">
        <Container className="py-8 md:py-10">
          <div className="mb-6">
            <SourceFlow />
            <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-ink/50 dark:text-dark-soft/60">
              Academic sources are credited for context. No university named below has reviewed,
              endorsed, or is otherwise affiliated with MBA Lab.
            </p>
          </div>
          <div>
            {sources.map((s) => {
              const outputCount =
                labEntries.filter((entry) => s.outputs.includes(entry.slug)).length +
                essays.filter((essay) => s.outputs.includes(essay.slug)).length;
              const topic = getTopic(s.subject);
              return (
                <Link
                  key={s.slug}
                  href={`/courses/${s.slug}`}
                  className="group block border-t border-rule py-5 first:border-t-0 dark:border-dark-rule"
                >
                  <span className="font-mono text-[11px] uppercase tracking-widest text-gold">
                    {s.institution}
                  </span>
                  <h2 className="mt-1.5 font-serif text-2xl font-medium text-ink transition-colors group-hover:text-gold dark:text-dark-ink">
                    {s.course}
                  </h2>
                  <p className="mt-1 text-sm text-ink/50 dark:text-dark-soft/70">
                    {topic?.name}
                    {s.instructor ? ` · ${s.instructor}` : ''}
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/60 dark:text-dark-soft">
                    {s.why}
                  </p>
                  {outputCount > 0 && (
                    <p className="mt-2 text-xs text-ink/40 dark:text-dark-soft/50">
                      {outputCount} related {outputCount === 1 ? 'piece' : 'pieces'}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
