import Link from 'next/link';
import JourneyPhases from '@/components/JourneyPhases';

export default function HomePage() {
  return (
    <div className="home-hero">
      <div className="home-hero-background" aria-hidden="true" />

      <section className="home-copy" aria-labelledby="home-title">
        <h1 id="home-title">
          Building the next
          <br />
          chapter, deliberately.
        </h1>

        <p className="home-description">
          Exploring ideas, skills and opportunities
          <br />
          for a meaningful MBA journey.
        </p>

        <Link href="/mba-lab" className="home-cta">
          <span>Explore the Lab</span>
          <span className="home-arrow" aria-hidden="true">→</span>
        </Link>
      </section>

      <div className="home-journey" aria-label="MBA journey phases">
        <JourneyPhases />
      </div>
    </div>
  );
}
