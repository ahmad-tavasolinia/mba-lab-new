import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { phases, getPhase } from '@/lib/phases';
import { categories } from '@/lib/categories';
import { getAllLabEntries } from '@/lib/content';
import { getCategoryColor } from '@/lib/keyColors';
import { Container, Eyebrow } from '@/components/ui';
import LabLibrary from '@/components/LabLibrary';

export async function generateStaticParams() {
  return phases.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const phase = getPhase(params.slug);
  if (!phase) return { title: 'Phase not found' };
  return { title: phase.pageTitle, description: phase.description };
}

export default async function PhasePage({ params }: { params: { slug: string } }) {
  const phase = getPhase(params.slug);
  if (!phase) notFound();

  const allEntries = await getAllLabEntries();
  const entries = allEntries.filter((e) => e.journeyPhase === phase.slug);
  const otherPhases = phases.filter((p) => p.slug !== phase.slug);

  return (
    <div>
      <section className="border-b border-rule dark:border-dark-rule">
        <Container className="py-14 md:py-16">
          <Link
            href="/mba-lab"
            className="font-mono text-[11px] uppercase tracking-widest text-ink/40 hover:text-gold dark:text-dark-soft/60"
          >
            ← MBA Lab
          </Link>
          <div className="mt-6 flex items-center gap-3">
            <span className="rounded-full border border-gold/40 bg-gold/5 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-gold">
              {phase.fullLabel}
            </span>
          </div>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl font-medium tracking-tight text-ink dark:text-dark-ink md:text-6xl">
            {phase.name}
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/70 dark:text-dark-soft">
            {phase.description}
          </p>
        </Container>
      </section>

      <section>
        <Container className="py-10 md:py-12">
          {entries.length === 0 ? (
            <p className="text-sm text-ink/50 dark:text-dark-soft">
              Nothing published in this phase yet, check back soon.
            </p>
          ) : (
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
          )}
        </Container>
      </section>

      <section className="border-t border-rule dark:border-dark-rule">
        <Container className="py-14">
          <Eyebrow>Other phases</Eyebrow>
          <div className="mt-6 flex flex-wrap gap-3">
            {otherPhases.map((p) => (
              <Link
                key={p.slug}
                href={`/mba-lab/phase/${p.slug}`}
                className="rounded-full border border-gold/30 bg-gold/5 px-4 py-2 text-sm text-gold hover:border-gold"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
