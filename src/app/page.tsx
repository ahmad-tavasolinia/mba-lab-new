import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import JourneyPhases from '@/components/JourneyPhases';

export const metadata = createPageMetadata({
  title: 'MBA Lab',
  documentTitle: 'MBA Lab | Ahmad Tavasolinia',
  socialTitle: 'MBA Lab | Ahmad Tavasolinia',
  description: 'An independent record of studying business, testing ideas, and building projects through a deliberate MBA journey.',
  path: '/',
});

export default function HomePage() {
  return (
    <div className="home-hero">
      <div className="home-hero-background" aria-hidden="true" />

      <section className="home-copy home-copy-english" aria-labelledby="home-title">
        <h1 id="home-title">
          <span className="home-copy-line home-title-line">Building the next</span>
          <span className="home-copy-line home-title-line">chapter, deliberately.</span>
        </h1>

        <p className="home-description">
          <span className="home-copy-line home-description-line">Exploring ideas, skills and opportunities</span>
          <span className="home-copy-line home-description-line">for a meaningful MBA journey.</span>
        </p>

        <Link href="/mba-lab" className="home-cta">
          <span>Explore MBA Lab</span>
          <span className="home-arrow" aria-hidden="true">→</span>
        </Link>
      </section>

      <div className="home-journey home-journey-english" aria-label="MBA journey phases">
        <JourneyPhases />
      </div>
    </div>
  );
}
