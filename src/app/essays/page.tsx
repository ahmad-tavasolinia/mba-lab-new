import type { Metadata } from 'next';
import { getAllEssays } from '@/lib/content';
import { Container, Eyebrow } from '@/components/ui';
import EssaysLibrary from '@/components/EssaysLibrary';

export const metadata: Metadata = {
  title: 'Essays',
  description: 'Independent, broader essays on business, technology, and the future of work.',
};

export default async function EssaysPage() {
  const essays = await getAllEssays();
  return (
    <div>
      <section className="border-b border-rule dark:border-dark-rule">
        <Container className="py-20 md:py-24">
          <Eyebrow>Independent writing</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl font-medium tracking-tight text-ink dark:text-dark-ink md:text-6xl">
            Essays
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/70 dark:text-dark-soft">
            Broader, independent essays that don't come from a single course, a serious personal
            publication on business, technology, and the future of work.
          </p>
        </Container>
      </section>
      <section>
        <Container className="py-16">
          <EssaysLibrary essays={essays} />
        </Container>
      </section>
    </div>
  );
}
