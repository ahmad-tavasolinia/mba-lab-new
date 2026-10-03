import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEssay, getEssaySlugs } from '@/lib/content';
import { Container, TopicChip, formatDate } from '@/components/ui';

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
    return { title: essay.title, description: essay.summary };
  } catch {
    return { title: 'Essay not found' };
  }
}

export default async function EssayPage({ params }: { params: { slug: string } }) {
  const slugs = getEssaySlugs();
  if (!slugs.includes(params.slug)) notFound();
  const essay = await getEssay(params.slug);

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
        </Container>
      </section>
      <Container className="py-14 md:py-20">
        <div
          className="prose-lab mx-auto max-w-prose text-ink dark:text-dark-ink"
          dangerouslySetInnerHTML={{ __html: essay.contentHtml }}
        />
      </Container>
    </article>
  );
}
