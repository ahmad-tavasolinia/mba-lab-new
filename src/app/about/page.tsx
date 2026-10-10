import Link from 'next/link';
import Image from 'next/image';
import { Container, Eyebrow } from '@/components/ui';
import { createPageMetadata } from '@/lib/seo';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata = createPageMetadata({
  title: 'About',
  description: 'About Ahmad Tavasolinia and the thinking behind MBA Lab.',
  path: '/about/',
});

export default function AboutPage() {
  return (
    <div className="page-about">
      <section className="border-b border-rule dark:border-dark-rule">
        <Container className="py-20 md:py-24">
          <Eyebrow>About</Eyebrow>
          <h1 className="mt-3 max-w-2xl font-serif text-5xl font-medium tracking-tight text-ink dark:text-dark-ink md:text-6xl">
            Ahmad Tavasolinia
          </h1>
        </Container>
      </section>

      <section>
        <Container className="grid gap-14 py-16 md:grid-cols-[1fr,320px]">
          <div className="prose-lab max-w-prose text-ink dark:text-dark-ink">
            <p>
              I’ve always wondered why some businesses find their footing and grow while others
              struggle despite good ideas and a lot of effort. It’s rarely one thing. Markets,
              management decisions, resources, and timing all play a part.
            </p>

            <p>
              Most of what I read circles around strategy and competition, how markets work,
              entrepreneurship, and what AI is doing to the way businesses operate.
            </p>

            <p>
              I started MBA Lab to take my learning past books and courses. I write about ideas,
              work through business cases, and try to see what management concepts mean outside the
              classroom. I don’t want to accept an idea just because it sounds convincing. I’d
              rather look closely, question its assumptions, and see whether it holds up.
            </p>

            <p>
              I still have plenty of open questions, and some of my views will probably change as I
              learn more. This site is where I keep track of what I’m learning and the ideas I want
              to explore further.
            </p>
          </div>

          <aside className="space-y-6 md:sticky md:top-24 md:self-start">
            <Image
              src={`${basePath}/me.jpg`}
              alt="Ahmad Tavasolinia"
              width={200}
              height={200}
              className="mx-auto h-40 w-40 rounded-full object-cover"
              priority
            />

            <div className="rounded-lg border border-rule p-6 dark:border-dark-rule">
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink/40 dark:text-dark-soft/60">
                Areas of interest
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-ink/70 dark:text-dark-soft">
                <li>Business &amp; entrepreneurship</li>
                <li>Strategy &amp; business analysis</li>
                <li>Artificial intelligence</li>
                <li>Technology &amp; markets</li>
              </ul>
            </div>

            <Link
              href="/cv"
              className="block rounded-full bg-ink px-6 py-3 text-center font-mono text-[12px] uppercase tracking-widest text-paper transition hover:bg-gold dark:bg-dark-ink dark:text-dark-bg"
            >
              View CV →
            </Link>

            <Link
              href="/mba-lab"
              className="block rounded-full border border-rule px-6 py-3 text-center font-mono text-[12px] uppercase tracking-widest text-ink transition hover:border-gold hover:text-gold dark:border-dark-rule dark:text-dark-ink"
            >
              Explore MBA Lab
            </Link>
          </aside>
        </Container>
      </section>
    </div>
  );
}
