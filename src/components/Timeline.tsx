const phases = [
  {
    n: '01',
    title: 'Foundations',
    desc: 'Economics, finance, and accounting, the vocabulary everything else is built on.',
    status: 'complete',
  },
  {
    n: '02',
    title: 'Understanding Organizations',
    desc: 'Leadership, organizational behavior, and management, how people actually coordinate.',
    status: 'complete',
  },
  {
    n: '03',
    title: 'Strategy and Competition',
    desc: 'Competitive advantage, business models, and strategic thinking.',
    status: 'active',
  },
  {
    n: '04',
    title: 'Entrepreneurship and Innovation',
    desc: 'Startups, innovation, uncertainty, and opportunity.',
    status: 'upcoming',
  },
  {
    n: '05',
    title: 'The Future of Business',
    desc: 'Artificial intelligence, technology, automation, and changing organizations.',
    status: 'upcoming',
  },
];

export default function Timeline() {
  return (
    <ol className="relative border-l border-rule pl-8 dark:border-dark-rule">
      {phases.map((phase) => (
        <li key={phase.n} className="relative pb-10 last:pb-0">
          <span
            className={`absolute -left-[2.35rem] top-0.5 flex h-5 w-5 items-center justify-center rounded-full border font-mono text-[9px] ${
              phase.status === 'complete'
                ? 'border-gold bg-gold text-paper dark:text-dark-bg'
                : phase.status === 'active'
                ? 'border-gold text-gold'
                : 'border-rule text-ink/30 dark:border-dark-rule dark:text-dark-soft/40'
            }`}
          >
            {phase.n}
          </span>
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink/40 dark:text-dark-soft/60">
            Phase {phase.n}
            {phase.status === 'active' && <span className="ml-2 text-gold">· in progress</span>}
          </p>
          <h3 className="mt-1 font-serif text-xl font-medium text-ink dark:text-dark-ink">
            {phase.title}
          </h3>
          <p className="mt-1 max-w-lg text-sm leading-relaxed text-ink/60 dark:text-dark-soft">
            {phase.desc}
          </p>
        </li>
      ))}
    </ol>
  );
}
