import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categories, getCategory } from '@/lib/categories';
import { getAllLabEntries } from '@/lib/content';
import { getCategoryColor } from '@/lib/keyColors';
import { Container, Eyebrow } from '@/components/ui';
import LabLibrary from '@/components/LabLibrary';

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = getCategory(params.slug);
  if (!category) return { title: 'Category not found' };
  return { title: category.name, description: category.description };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategory(params.slug);
  if (!category) notFound();
  const color = getCategoryColor(category.slug);

  const entries = (await getAllLabEntries()).filter((e) => e.category === category.slug);
  const otherCategories = categories.filter((c) => c.slug !== category.slug);

  return (
    <div className="flex flex-1 flex-col">
      <section className="border-b border-rule dark:border-dark-rule">
        <Container className="py-10 text-left md:py-12">
          <Link
            href="/mba-lab"
            className="font-mono text-[11px] uppercase tracking-widest text-ink/40 hover:text-gold dark:text-dark-soft/60"
          >
            ← MBA Lab
          </Link>
          <div className="mt-6 flex items-center gap-3">
            <span className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest ${color.badge}`}>
              {category.code}
            </span>
          </div>
          <h1 className="mt-3 max-w-3xl text-left font-serif text-5xl font-medium tracking-tight text-ink dark:text-dark-ink md:text-6xl">
            {category.name}
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/70 dark:text-dark-soft">
            {category.description}
          </p>
        </Container>
      </section>

      <section className="flex flex-1 flex-col justify-center">
        <Container className="w-full py-8">
          {entries.length === 0 ? (
            <p className="text-sm text-ink/50 dark:text-dark-soft">
              Nothing under {category.name} yet, check back soon.
            </p>
          ) : (
            <LabLibrary entries={entries} />
          )}
        </Container>
      </section>

      <section className="border-t border-rule dark:border-dark-rule">
        <Container className="py-8">
          <Eyebrow>Other keys</Eyebrow>
          <div className="mt-6 flex flex-wrap gap-3">
            {otherCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/mba-lab/category/${c.slug}`}
                className="rounded-full border border-forest/30 bg-forest/5 px-4 py-2 text-sm text-forest hover:border-forest dark:border-forest-bright/30 dark:bg-forest-bright/10 dark:text-forest-bright"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
