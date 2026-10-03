import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Eyebrow } from '@/components/ui';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Ahmad Tavasolinia and the thinking behind MBA Lab.',
};

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
            <p className="font-serif text-xl italic leading-relaxed text-ink/80 dark:text-dark-soft">
              I’m interested in what happens when a difficult problem has no clean answer.
            </p>

            <p>
              My work sits at the intersection of <strong>business, strategy, markets, technology,
              AI, and entrepreneurship</strong>. I like problems where the information is
              incomplete, the resources are limited, the incentives are messy, and a decision still
              has to be made.
            </p>

            <p>
              I approach business through a simple habit: <strong>understand the problem, test the
              assumptions, follow the numbers, and question the model when reality doesn't fit
              it.</strong>
            </p>

            <p>
              That’s why I spend a lot of my time studying cases, markets, financial models,
              strategy, and emerging technologies. I don't want to collect knowledge. I want to use
              it. I write, analyze, build, and test ideas to see whether they survive contact with
              reality.
            </p>

            <p>
              I'm particularly interested in how <strong>AI is changing the economics of
              businesses</strong>, how technology changes markets and competitive advantage, and how
              companies can create and capture value when the environment keeps changing.
            </p>

            <p>
              I’m also building toward a career in <strong>strategy, business analysis, and
              technology-driven entrepreneurship</strong>, with a growing focus on the intersection
              of AI and business.
            </p>

            <p>
              I don't have a fixed answer for where all of this leads yet. That's part of the point.
              I’d rather work on difficult problems and find out.
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
