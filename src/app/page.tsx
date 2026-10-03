import Link from 'next/link';
import JourneyPhases from '@/components/JourneyPhases';

function LanguageSwitch() {
  return (
    <nav className="home-language-switch" aria-label="Choose language" dir="ltr">
      <span aria-current="page">English</span><span aria-hidden="true">/</span><Link href="/fa" lang="fa">فارسی</Link>
    </nav>
  );
}

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

        <LanguageSwitch />

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
