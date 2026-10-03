import type { Metadata } from 'next';
import { Container, Eyebrow } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Ahmad Tavasolinia.',
};

export default function ContactPage() {
  return (
    <div>
      <section className="border-b border-rule dark:border-dark-rule">
        <Container className="py-20 md:py-24">
          <Eyebrow>Get in touch</Eyebrow>
          <h1 className="mt-3 max-w-2xl font-serif text-5xl font-medium tracking-tight text-ink dark:text-dark-ink md:text-6xl">
            Contact
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/70 dark:text-dark-soft">
            If something in MBA Lab prompted a question, a disagreement, or a connection I haven't
            made yet, I'd like to hear about it.
          </p>
        </Container>
      </section>

      <section>
        <Container className="py-16">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink/40 dark:text-dark-soft/60">
                Email
              </p>
              <a
                href="mailto:amd.tavasolinia@gmail.com"
                className="mt-2 block font-serif text-2xl text-ink hover:text-gold dark:text-dark-ink"
              >
                amd.tavasolinia@gmail.com
              </a>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink/40 dark:text-dark-soft/60">
                Elsewhere
              </p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a
                    href="https://www.linkedin.com/in/ahmad-tavasolinia-0a4903202/"
                    className="text-sm text-ink/70 underline decoration-rule underline-offset-4 hover:text-gold dark:text-dark-soft"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
