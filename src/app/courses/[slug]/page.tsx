import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSource, getSourceSlugs, getAllLabEntries } from '@/lib/content';
import { getTopic } from '@/lib/topics';
import { Container, Eyebrow, formatDate } from '@/components/ui';
import SourceFlow from '@/components/SourceFlow';

export async function generateStaticParams() {
  return getSourceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const source = getSource(params.slug);
    return { title: source.course, description: source.why };
  } catch {
    return { title: 'Source not found' };
  }
}

export default async function SourcePage({ params }: { params: { slug: string } }) {
  const slugs = getSourceSlugs();
  if (!slugs.includes(params.slug)) notFound();

  const source = getSource(params.slug);
  const topic = getTopic(source.subject);
  const outputs = (await getAllLabEntries()).filter((e) => source.outputs.includes(e.slug));

  return (
    <div>
      <section className="border-b border-rule dark:border-dark-rule">
        <Container className="py-16 md:py-20">
          <Link
            href="/courses"
            className="font-mono text-[11px] uppercase tracking-widest text-ink/40 hover:text-gold dark:text-dark-soft/60"
          >
            ← Courses &amp; Sources
          </Link>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-gold">
            {source.institution}
          </p>
          <h1 className="mt-2 max-w-2xl font-serif text-4xl font-medium tracking-tight text-ink dark:text-dark-ink md:text-5xl">
            {source.courseUrl ? (
              <a href={source.courseUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                {source.course}
              </a>
            ) : (
              source.course
            )}
          </h1>
          <p className="mt-3 text-sm text-ink/50 dark:text-dark-soft/70">
            {topic?.name}
            {source.instructor ? (
              <>
                {' · '}
                {source.instructorUrl ? (
                  <a
                    href={source.instructorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold"
                  >
                    {source.instructor}
                  </a>
                ) : (
                  source.instructor
                )}
              </>
            ) : (
              ''
            )}
          </p>
        </Container>
      </section>

      <section className="border-b border-rule dark:border-dark-rule">
        <Container className="grid gap-10 py-14 md:grid-cols-2">
          <div>
            <Eyebrow>Why I studied it</Eyebrow>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink/70 dark:text-dark-soft">
              {source.why}
            </p>
          </div>
          <div>
            <Eyebrow>The process</Eyebrow>
            <div className="mt-4">
              <SourceFlow />
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-14">
          <Eyebrow>What emerged from it</Eyebrow>
          <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink dark:text-dark-ink">
            Related MBA Lab outputs
          </h2>
          <div className="mt-8">
            {outputs.map((e) => (
              <Link
                key={e.slug}
                href={`/mba-lab/${e.slug}`}
                className="group block border-t border-rule py-6 first:border-t-0 dark:border-dark-rule"
              >
                <span className="font-mono text-[11px] uppercase tracking-widest text-ink/40 dark:text-dark-soft/60">
                  {formatDate(e.date)}
                </span>
                <h3 className="mt-2 font-serif text-xl font-medium text-ink transition-colors group-hover:text-gold dark:text-dark-ink">
                  {e.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/60 dark:text-dark-soft">
                  {e.summary}
                </p>
              </Link>
            ))}
          </div>
          <p className="mt-8 max-w-xl text-[11px] leading-relaxed text-ink/40 dark:text-dark-soft/50">
            This page credits an academic source for context. The analysis, synthesis, and
            conclusions above are my own; {source.institution} does not review or endorse MBA Lab.
          </p>
        </Container>
      </section>
    </div>
  );
}
