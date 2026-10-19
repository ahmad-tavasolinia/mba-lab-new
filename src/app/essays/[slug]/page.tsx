import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllSources, getEssay, getEssaySlugs } from '@/lib/content';
import { Container, TopicChip, formatDate } from '@/components/ui';
import { createPageMetadata } from '@/lib/seo';
import { getPhase } from '@/lib/phases';

export async function generateStaticParams() {
  return getEssaySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const essay = await getEssay(params.slug);
    return createPageMetadata({
      title: essay.title,
      description: essay.summary,
      path: `/essays/${params.slug}/`,
      type: 'article',
    });
  } catch {
    return { title: 'Essay not found' };
  }
}

export default async function EssayPage({ params }: { params: { slug: string } }) {
  const slugs = getEssaySlugs();
  if (!slugs.includes(params.slug)) notFound();
  const essay = await getEssay(params.slug);
  const journeyPhase = essay.journeyPhase ? getPhase(essay.journeyPhase) : undefined;
  const relatedSources = getAllSources().filter((source) => essay.sources?.includes(source.slug));

  return (
    <article className="reader-page">
      <section className="border-b border-rule dark:border-dark-rule">
        <Container className="py-16 md:py-20">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/essays"
              className="font-mono text-[11px] uppercase tracking-widest text-ink/40 hover:text-gold dark:text-dark-soft/60"
            >
            ← Essays
            </Link>
          </div>
          <h1 className="mt-6 max-w-3xl font-serif text-4xl font-medium leading-tight tracking-tight text-ink dark:text-dark-ink md:text-5xl">
            {essay.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-ink/50 dark:text-dark-soft">
            <span>{formatDate(essay.date)}</span>
            <span>·</span>
            <span>{essay.readingTime}</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {essay.topics.map((t) => (
              <TopicChip key={t} slug={t} />
            ))}
          </div>
          {journeyPhase && (
            <div className="mt-5">
              <Link href={`/mba-lab/phase/${journeyPhase.slug}`} className="phase-detail-tag">
                {journeyPhase.pageTitle}
              </Link>
            </div>
          )}
        </Container>
      </section>
      <Container className="py-14 md:py-20">
        <div
          className="prose-lab mx-auto max-w-prose text-ink dark:text-dark-ink"
          dangerouslySetInnerHTML={{ __html: essay.contentHtml }}
        />
        {relatedSources.length > 0 && (
          <section className="mx-auto mt-12 max-w-prose border-t border-rule pt-6 dark:border-dark-rule">
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink/40 dark:text-dark-soft/60">
              Related course
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {relatedSources.map((source) => (
                <Link key={source.slug} href={`/courses/${source.slug}`} className="text-sm text-ink/70 underline decoration-rule underline-offset-4 hover:text-gold dark:text-dark-soft">
                  {source.course}
                </Link>
              ))}
            </div>
          </section>
        )}
      </Container>
    </article>
  );
}
