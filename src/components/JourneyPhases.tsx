import Link from "next/link";
import { phases, getPhaseStatus } from "@/lib/phases";

export default function JourneyPhases() {
  return (
    <div className="journey-wrapper">
      <p className="journey-title">THE JOURNEY</p>
      <div className="journey-track">
        {phases.map((phase, i) => {
          const status = getPhaseStatus(phase.slug);
          const isLast = i === phases.length - 1;

          return (
            <div key={phase.slug} className={`journey-step ${isLast ? "last" : ""}`}>
              <Link
                href={`/mba-lab/phase/${phase.slug}`}
                className={`journey-phase ${status}`}
              >
                <span className="journey-circle">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="journey-name">{phase.name}</span>
              </Link>

              {!isLast && (
                <div className={`journey-line ${status === "complete" ? "filled" : ""}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
