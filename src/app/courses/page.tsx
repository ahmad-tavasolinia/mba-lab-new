import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllSources, getAllLabEntries } from '@/lib/content';
import { getTopic } from '@/lib/topics';
import { Container, Eyebrow } from '@/components/ui';
import SourceFlow from '@/components/SourceFlow';

export const metadata: Metadata = {
  title: 'Courses & Sources',
  description: 'The academic sources behind MBA Lab, and what emerged from studying them.',
};

export default async function CoursesPage() {
  const sources = getAllSources();
  const labEntries = await getAllLabEntries();

  return (
    <div>
      <section className="border-b border-rule dark:border-dark-rule">
        <Container className="py-10 md:py-12">
          <Eyebrow>Where the ideas come from</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl font-medium tracking-tight text-ink dark:text-dark-ink md:text-6xl">
            Courses &amp; Sources
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink/70 dark:text-dark-soft">
            This is not a list of certificates. It's a record of what I studied and, more
            importantly, what came out of studying it.
          </p>
          <div className="mt-5">
            <SourceFlow />
          </div>
          <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-ink/40 dark:text-dark-soft/50">
            Academic sources are credited for context. No university named below has reviewed,
            endorsed, or is otherwise affiliated with MBA Lab.
          </p>
        </Container>
      </section>

      <section>
        <Container className="py-8">
          <div>
            {sources.map((s) => {
              const outputs = labEntries.filter((e) => s.outputs.includes(e.slug));
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
                  {outputs.length > 0 && (
                    <p className="mt-2 text-xs text-ink/40 dark:text-dark-soft/50">
                      {outputs.length} related MBA Lab {outputs.length === 1 ? 'entry' : 'entries'}
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
