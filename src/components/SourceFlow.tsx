const steps = ['Source', 'Study', 'Independent Synthesis', 'Published Output'];

export default function SourceFlow() {
  return (
    <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink/50 dark:text-dark-soft/70">
      {steps.map((s, i) => (
        <span key={s} className="flex items-center gap-2">
          <span
            className={`rounded-full border px-3 py-1 ${
              i === steps.length - 1
                ? 'border-gold text-gold'
                : 'border-rule dark:border-dark-rule'
            }`}
          >
            {s}
          </span>
          {i < steps.length - 1 && <span className="text-ink/30 dark:text-dark-soft/40">→</span>}
        </span>
      ))}
    </div>
  );
}
