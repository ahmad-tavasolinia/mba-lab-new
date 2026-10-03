import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { topics, getTopic } from '@/lib/topics';
import { categories } from '@/lib/categories';
import { getAllLabEntries, getAllSources } from '@/lib/content';
import { getTopicColor, getCategoryColor } from '@/lib/keyColors';
import { Container, Eyebrow } from '@/components/ui';
import LabLibrary from '@/components/LabLibrary';

export async function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const topic = getTopic(params.slug);
  if (!topic) return { title: 'Topic not found' };
  return { title: topic.name, description: topic.description };
}

export default async function TopicPage({ params }: { params: { slug: string } }) {
  const topic = getTopic(params.slug);
  if (!topic) notFound();
  const color = getTopicColor(topic.slug);

  const entries = (await getAllLabEntries()).filter((e) => e.topics.includes(topic.slug));
  const sources = getAllSources().filter((s) => s.subject === topic.slug);
  const related = topics.filter((t) => t.slug !== topic.slug).slice(0, 4);

  return (
    <div>
      <section className="border-b border-rule dark:border-dark-rule">
        <Container className="py-10 md:py-12">
          <Link
            href="/topics"
            className="font-mono text-[11px] uppercase tracking-widest text-ink/40 hover:text-gold dark:text-dark-soft/60"
          >
            ← Topics
          </Link>
          <div className="mt-6 flex items-center gap-3">
            <span className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest ${color.badge}`}>
              {topic.code}
            </span>
          </div>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl font-medium tracking-tight text-ink dark:text-dark-ink md:text-6xl">
            {topic.name}
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/70 dark:text-dark-soft">
            {topic.description}
          </p>
        </Container>
      </section>

      {entries.length > 0 && (
        <section className="border-b border-rule dark:border-dark-rule">
          <Container className="py-14">
            <div className="space-y-14">
              {categories.map((cat) => {
                const catEntries = entries.filter((e) => e.category === cat.slug);
                if (catEntries.length === 0) return null;
                const col = getCategoryColor(cat.slug);
                return (
                  <div key={cat.slug}>
                    <div className="flex items-baseline gap-3">
                      <span className={`font-mono text-[11px] uppercase tracking-widest ${col.code}`}>
                        {cat.code}
                      </span>
                      <h2 className="font-serif text-2xl font-medium text-ink dark:text-dark-ink">
                        {cat.name}
                      </h2>
                    </div>
                    <div className="mt-6">
                      <LabLibrary entries={catEntries} initialVisibleCount={1} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {sources.length > 0 && (
        <section className="border-b border-rule dark:border-dark-rule">
          <Container className="py-14">
            <Eyebrow>Related sources</Eyebrow>
            <div className="mt-6 flex flex-wrap gap-3">
              {sources.map((s) => (
                <Link
                  key={s.slug}
                  href={`/courses/${s.slug}`}
                  className="rounded-full border border-rule px-4 py-2 text-sm hover:border-gold hover:text-gold dark:border-dark-rule"
                >
                  {s.course}
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section>
        <Container className="py-14">
          <Eyebrow>Continue exploring</Eyebrow>
          <div className="mt-6 flex flex-wrap gap-3">
            {related.map((t) => (
              <Link
                key={t.slug}
                href={`/topics/${t.slug}`}
                className="rounded-full border border-forest/30 bg-forest/5 px-4 py-2 text-sm text-forest hover:border-forest dark:border-forest-bright/30 dark:bg-forest-bright/10 dark:text-forest-bright"
              >
                {topic.name} → {t.name}
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
