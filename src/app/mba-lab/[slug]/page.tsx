import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllLabEntries, getLabEntry, getLabSlugs, getAllSources } from '@/lib/content';
import { getPhase } from '@/lib/phases';
import { Container, Eyebrow, TopicChip, CodeChip, formatDate } from '@/components/ui';

export async function generateStaticParams() {
  return getLabSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const entry = await getLabEntry(params.slug);
    return { title: entry.title, description: entry.summary };
  } catch {
    return { title: 'Entry not found' };
  }
}

function ProjectDetails({ entry }: { entry: Awaited<ReturnType<typeof getLabEntry>> }) {
  const screenshotOrder = ['dataset', 'summary', 'income', 'monthly'];
  const screenshots = [...(entry.screenshots ?? [])].sort((a, b) => {
    const ai = screenshotOrder.findIndex((key) => `${a.alt} ${a.caption}`.toLowerCase().includes(key));
    const bi = screenshotOrder.findIndex((key) => `${b.alt} ${b.caption}`.toLowerCase().includes(key));
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
  const practice = entry.practice ?? [];
  const journeyPhase = getPhase(entry.journeyPhase);

  return (
    <article className="reader-page">
      <section className="border-b border-rule dark:border-dark-rule">
        <Container className="py-8 md:py-10">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/mba-lab/category/projects"
              className="font-mono text-[11px] uppercase tracking-widest text-ink/40 hover:text-gold dark:text-dark-soft/60"
            >
            ← Projects
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <p className="font-mono text-[11px] uppercase tracking-widest text-gold">
              {entry.projectType ?? 'Project'}
            </p>
            {journeyPhase && (
              <Link
                href={`/mba-lab/phase/${journeyPhase.slug}`}
                className="rounded-full border border-gold/40 bg-gold/5 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-gold hover:border-gold"
              >
                {journeyPhase.name}
              </Link>
            )}
          </div>
          <h1 className="mt-3 max-w-4xl font-serif text-4xl font-medium leading-tight tracking-tight text-ink dark:text-dark-ink md:text-5xl">
            {entry.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/65 dark:text-dark-soft">
            {entry.summary}
          </p>
          <div className="mt-3 text-sm text-ink/45 dark:text-dark-soft/60">
            {formatDate(entry.date)}
          </div>
        </Container>
      </section>

      <Container className="py-6 md:py-8">
        <div className="prose-lab text-ink dark:text-dark-ink" dangerouslySetInnerHTML={{ __html: entry.contentHtml }} />

        {practice.length > 0 && (
          <section className="mt-6 border-t border-rule pt-4 dark:border-dark-rule">
            <p className="font-mono text-[11px] uppercase tracking-widest text-gold">
              What I practiced
            </p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {practice.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-rule px-3 py-1.5 font-mono text-[12px] text-ink/65 dark:border-dark-rule dark:text-dark-soft"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>
        )}

        {screenshots.length > 0 && (
          <section className="mt-6 border-t border-rule pt-4 dark:border-dark-rule">
            <p className="font-mono text-[11px] uppercase tracking-widest text-gold">
              Project
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              {screenshots.map((shot) => (
                <figure key={shot.src} className="min-w-0">
                  <a
                    href={shot.src}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${shot.alt} at full size`}
                    className="group block overflow-hidden border border-rule bg-black/20 dark:border-dark-rule"
                  >
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      className="block h-32 w-full object-cover transition-opacity group-hover:opacity-80"
                    />
                  </a>
                  <figcaption className="mt-2 text-xs leading-relaxed text-ink/50 dark:text-dark-soft/65">
                    {shot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {entry.download && (
          <section className="mt-8 border-t border-rule pt-6 dark:border-dark-rule">
            <p className="font-mono text-[11px] uppercase tracking-widest text-gold">
              Explore the model
            </p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/60 dark:text-dark-soft">
              Want to see how the model works? Open the original workbook and explore the
              formulas, calculations, and underlying transaction data.
            </p>
            <a
              href={entry.download.href}
              download
              className="mt-4 inline-flex items-center gap-4 border-b border-gold pb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink hover:text-gold dark:text-dark-ink"
            >
              {entry.download.label}
              <span className="text-base">↓</span>
            </a>
          </section>
        )}
      </Container>
    </article>
  );
}

export default async function LabEntryPage({ params }: { params: { slug: string } }) {
  const slugs = getLabSlugs();
  if (!slugs.includes(params.slug)) notFound();

  const entry = await getLabEntry(params.slug);
  if (entry.category === 'projects') return <ProjectDetails entry={entry} />;
  const allEntries = await getAllLabEntries();
  const sources = getAllSources().filter((s) => entry.sources.includes(s.slug));
  const connectedEntries = allEntries.filter((e) => entry.connections.includes(e.slug));
  const journeyPhase = getPhase(entry.journeyPhase);

  return (
    <article className="reader-page">
      <section className="border-b border-rule dark:border-dark-rule">
        <Container className="py-16 md:py-20">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/mba-lab"
              className="font-mono text-[11px] uppercase tracking-widest text-ink/40 hover:text-gold dark:text-dark-soft/60"
            >
            ← MBA Lab
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <CodeChip>{entry.code}</CodeChip>
            {journeyPhase && (
              <Link
                href={`/mba-lab/phase/${journeyPhase.slug}`}
                className="rounded-full border border-gold/40 bg-gold/5 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-gold hover:border-gold"
              >
                {journeyPhase.pageTitle}
              </Link>
            )}
          </div>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-medium leading-tight tracking-tight text-ink dark:text-dark-ink md:text-5xl">
            {entry.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-ink/50 dark:text-dark-soft">
            <span>{formatDate(entry.date)}</span>
            <span>·</span>
            <span>{entry.readingTime}</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {entry.topics.map((t) => (
              <TopicChip key={t} slug={t} />
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-14 md:py-20">
        <div className="grid gap-14 md:grid-cols-[1fr,300px] md:gap-16">
          <div className="prose-lab max-w-prose text-ink dark:text-dark-ink" dangerouslySetInnerHTML={{ __html: entry.contentHtml }} />

          <aside className="space-y-10 md:sticky md:top-24 md:self-start">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-gold">
                The central question
              </p>
              <p className="mt-2 font-serif text-lg italic leading-snug text-ink dark:text-dark-ink">
                “{entry.centralQuestion}”
              </p>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink/40 dark:text-dark-soft/60">
                Key ideas
              </p>
              <ul className="mt-3 space-y-3">
                {entry.keyIdeas.map((idea, i) => (
                  <li key={i} className="border-l-2 border-rule pl-3 text-sm leading-relaxed text-ink/70 dark:border-dark-rule dark:text-dark-soft">
                    {idea}
                  </li>
                ))}
              </ul>
            </div>

            {connectedEntries.length > 0 && (
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink/40 dark:text-dark-soft/60">
                  Connections
                </p>
                <ul className="mt-3 space-y-2">
                  {connectedEntries.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/mba-lab/${c.slug}`}
                        className="text-sm leading-snug text-ink/70 underline decoration-rule underline-offset-4 hover:text-gold dark:text-dark-soft"
                      >
                        {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink/40 dark:text-dark-soft/60">
                Final perspective
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/70 dark:text-dark-soft">
                {entry.finalPerspective}
              </p>
            </div>

            {sources.length > 0 && (
              <div className="border-t border-rule pt-6 dark:border-dark-rule">
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink/40 dark:text-dark-soft/60">
                  Sources &amp; influences
                </p>
                <ul className="mt-3 space-y-3">
                  {sources.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/courses/${s.slug}`}
                        className="block text-sm font-medium text-ink hover:text-gold dark:text-dark-ink"
                      >
                        {s.course}
                      </Link>
                      <span className="text-xs text-ink/50 dark:text-dark-soft/70">
                        {s.institution}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[11px] leading-relaxed text-ink/40 dark:text-dark-soft/50">
                  Academic source above; analysis and interpretation are my own. No official
                  affiliation or endorsement is implied.
                </p>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </article>
  );
}
