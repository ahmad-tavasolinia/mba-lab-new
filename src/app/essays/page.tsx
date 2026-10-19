import { getAllEssays } from '@/lib/content';
import { Container, Eyebrow } from '@/components/ui';
import EssaysLibrary from '@/components/EssaysLibrary';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Essays',
  description: 'Long-form reflections on business, strategy, technology, and the future of work.',
  path: '/essays/',
});

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
            Longer reflections on business, strategy, technology, and the future of work, shaped by
            study, experience, and the ideas worth examining more closely.
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
