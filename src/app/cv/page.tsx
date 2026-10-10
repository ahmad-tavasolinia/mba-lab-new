import { Container, Eyebrow } from '@/components/ui';
import { createPageMetadata } from '@/lib/seo';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata = createPageMetadata({
  title: 'CV',
  description: 'Education, experience, certifications, and skills of Ahmad Tavasolinia.',
  path: '/cv/',
});

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-lg font-medium tracking-tight text-gold md:text-xl">
      {children}
    </h2>
  );
}

function Entry({
  role,
  place,
  time,
  children,
}: {
  role: string;
  place: string;
  time?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="border-t border-rule py-3 first:border-t-0 dark:border-dark-rule">
      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
        <h3 className="font-serif text-xl font-medium text-ink dark:text-dark-ink">{role}</h3>
        {time && (
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink/40 dark:text-dark-soft/60">
            {time}
          </span>
        )}
      </div>
      <p className="text-sm text-ink/50 dark:text-dark-soft/70">{place}</p>
      {children && <div className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/70 dark:text-dark-soft">{children}</div>}
    </div>
  );
}

export default function CvPage() {
  return (
    <div>
      <section className="border-b border-rule dark:border-dark-rule">
        <Container className="py-10 md:py-14">
          <Eyebrow>Curriculum vitae</Eyebrow>
          <h1 className="mt-3 font-serif text-5xl font-medium tracking-tight text-ink dark:text-dark-ink md:text-6xl">
            CV
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink/70 dark:text-dark-soft md:text-lg">
            MBA candidate with a background in Architectural Engineering and hands-on experience
            across product development, entrepreneurship, English-language teaching, and project
            coordination.
          </p>
          <a
            href={basePath + '/cv-en.pdf'}
            download
            className="mt-6 inline-flex items-center gap-3 rounded-full border border-gold px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-ink transition hover:bg-gold hover:text-paper dark:text-dark-ink dark:hover:text-dark-bg"
          >
            Download English CV (PDF) <span aria-hidden="true">↓</span>
          </a>
        </Container>
      </section>

      <section>
        <Container className="py-6 md:py-8">
          <div className="space-y-6">
            <div>
              <SectionHeading>Experience</SectionHeading>
              <div className="mt-4">
                <Entry role="Founder" place="Vatan English Club | English Speaking Community · Self-employed" time="Apr 2026 – Present">
                  <ul className="list-disc space-y-1.5 pl-5">
                    <li>Built a weekly English-language meetup in Birjand around original event formats, giving members a social alternative to a conventional class.</li>
                    <li>Partnered with a local café on a cost-sharing arrangement and launched with almost no upfront cost.</li>
                    <li>Ran five free pilot sessions with more than 20 participants, then introduced paid events and earned the first revenue within two months of developing the idea.</li>
                    <li>Promoted events on social media and used participant feedback to improve formats and encourage repeat attendance.</li>
                  </ul>
                </Entry>
                <Entry role="English as a Second Language Instructor" place="Kharazmi International Institute · Full-time" time="Aug 2024 – Jan 2026">
                  <p>Taught more than 150 students over 2,000+ hours. Regular classroom teaching strengthened public speaking and the ability to explain ideas clearly to people with different levels and learning styles.</p>
                </Entry>
                <Entry role="Co-Founder" place="XpertAim · South Khorasan Science and Technology Park · Full-time" time="Jun 2023 – May 2024">
                  <ul className="list-disc space-y-1.5 pl-5">
                    <li>Led the project from early development through MVP creation and customer testing.</li>
                    <li>Coordinated the team, set deadlines, assigned and tracked tasks, and managed day-to-day development.</li>
                    <li>Worked directly with customers to understand their needs, translate requirements into product features, and guide improvements based on feedback.</li>
                  </ul>
                </Entry>
                <Entry role="Compulsory Military Service" place="I.R.I. Army · Iran" time="2021 – 2023" />
                <Entry role="Project Coordinator Intern" place="Sustainable Alignment · Zurich, Switzerland · Remote" time="Mar 2021 – Aug 2021">
                  <p>Supported the planning and implementation of sustainability projects through research, project coordination, preparation of materials, social media content, and regular remote team discussions.</p>
                </Entry>
              </div>
            </div>

            <div className="border-t border-rule pt-6 dark:border-dark-rule">
              <SectionHeading>Education</SectionHeading>
              <div className="mt-4">
                <Entry role="Bachelor’s Degree, Architectural Engineering" place="Islamic Azad University" time="2017 – 2021" />
                <Entry role="High School Diploma, Mathematics" place="National Organization for Development of Exceptional Talents (Sampad)" time="2012 – 2016" />
              </div>
            </div>

            <div className="border-t border-rule pt-6 dark:border-dark-rule">
              <SectionHeading>Certifications</SectionHeading>
              <div className="mt-4">
                <Entry role="Management of Smart Urban Infrastructures" place="École Polytechnique Fédérale de Lausanne (EPFL)" time="Jan 2022" />
                <Entry role="IELTS Academic · Overall Band 7.0" place="IELTS Official" time="Feb 2022" />
              </div>
            </div>

            <div className="border-t border-rule pt-6 dark:border-dark-rule">
              <SectionHeading>Skills</SectionHeading>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Business Development', 'Customer Discovery', 'Communication', 'Product Development', 'Social Media Marketing'].map((skill) => (
                  <span key={skill} className="rounded-full border border-rule px-4 py-1.5 text-sm text-ink/70 dark:border-dark-rule dark:text-dark-soft">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-rule pt-6 dark:border-dark-rule">
              <SectionHeading>Languages</SectionHeading>
              <div className="mt-4">
                <Entry role="Persian" place="Native or bilingual proficiency" />
                <Entry role="English" place="Professional working proficiency" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
