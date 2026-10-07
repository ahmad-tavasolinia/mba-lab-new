import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllEssays, getAllLabEntries, getAllSources, getEssay, getEssaySlugs, getLabEntry, getLabEntryFrontmatter, getLabSlugs, getSource, getSourceSlugs } from '@/lib/content';
import { categories } from '@/lib/categories';
import { phases } from '@/lib/phases';
import { topics } from '@/lib/topics';
import PersianLabLibrary from '@/components/PersianLabLibrary';
import { faCategories, faEntrySummary, faEntryTitle, faEssaySummaries, faEssayTitles, faPhases, faSourceNames, faTopics } from '@/lib/persian';
import { createPageMetadata } from '@/lib/seo';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const persianLabRouteSlug = (slug: string) => slug.toLowerCase().replace(/'/g, '');

export function getPersianMetadata(path: string[]): Metadata {
  const route = (path[0] === 'mba-lab' && path.length === 2
    ? `mba-lab/${persianLabRouteSlug(path[1])}`
    : path.join('/')).toLowerCase();
  const canonicalPath = `/fa${route ? `/${route}` : ''}/`;
  let title = 'کارگاه مدیریت کسب‌وکار';
  let description = 'یادگیری، پژوهش و ساختن در کسب‌وکار؛ به روایت احمد توسلی‌نیا.';
  let type: 'website' | 'article' = 'website';

  if (!route) {
    title = 'کارگاه مدیریت کسب‌وکار';
    description = 'مجموعه‌ای مستقل از مطالعات، تحلیل‌ها و پروژه‌ها؛ تلاشی برای درک عمیق‌تر دنیای کسب‌وکار.';
  } else if (route === 'mba-lab') {
    title = 'کارگاه مدیریت کسب‌وکار';
    description = 'فضایی برای اندیشیدن به مسئله‌های کسب‌وکار، آزمودن ایده‌ها، ساختن پروژه‌ها و آموختن از کسانی که تجربهٔ ساختن دارند.';
  } else if (route === 'topics') {
    title = 'موضوع‌ها';
    description = 'ایده‌های کارگاه را در موضوع‌های راهبرد، مالی، بازاریابی، کارآفرینی و هوش مصنوعی دنبال کنید.';
  } else if (route === 'essays') {
    title = 'جستارها';
    description = 'نوشته‌هایی مستقل دربارهٔ کسب‌وکار، فناوری و آیندهٔ کار.';
  } else if (route === 'courses') {
    title = 'کتابخانه';
    description = 'منابع دانشگاهی و دوره‌هایی که مطالعه شده‌اند و خروجی‌هایی که از آن‌ها شکل گرفته‌اند.';
  } else if (route === 'about') {
    title = 'دربارهٔ احمد توسلی‌نیا';
    description = 'دربارهٔ مسیر یادگیری، علاقه‌های پژوهشی و کارگاه مدیریت کسب‌وکار احمد توسلی‌نیا.';
  } else if (route === 'contact') {
    title = 'تماس';
    description = 'راه‌های تماس با احمد توسلی‌نیا دربارهٔ کارگاه مدیریت کسب‌وکار.';
  } else if (route === 'cv') {
    title = 'رزومه';
    description = 'سوابق تحصیلی، حرفه‌ای و مهارت‌های احمد توسلی‌نیا.';
  } else if (path[0] === 'topics' && path.length === 2) {
    const topic = faTopics[path[1] as keyof typeof faTopics];
    if (topic) ({ title, description } = { title: topic.name, description: topic.description });
  } else if (path[0] === 'mba-lab' && path[1] === 'phase' && path.length === 3) {
    const phase = faPhases[path[2] as keyof typeof faPhases];
    if (phase) ({ title, description } = { title: phase.name, description: phase.description });
  } else if (path[0] === 'mba-lab' && path[1] === 'category' && path.length === 3) {
    const category = faCategories[path[2] as keyof typeof faCategories];
    if (category) ({ title, description } = { title: category.name, description: category.description });
  } else if (path[0] === 'mba-lab' && path.length === 2) {
    const entry = getLabEntryFrontmatter(path[1]);
    title = faEntryTitle(path[1], entry.title);
    description = faEntrySummary(path[1], entry.summary);
    type = 'article';
  } else if (path[0] === 'courses' && path.length === 2) {
    const source = getSource(path[1]);
    const translated = faSourceNames[source.slug];
    title = translated?.course ?? source.course;
    description = translated?.why ?? source.why;
    type = 'article';
  }

  return createPageMetadata({
    title,
    description,
    path: canonicalPath,
    socialTitle: `${title} | کارگاه مدیریت کسب‌وکار`,
    type,
  });
}

function FaEntryLink({ entry }: { entry: Awaited<ReturnType<typeof getLabEntry>> }) {
  return (
    <Link href={`/fa/mba-lab/${persianLabRouteSlug(entry.slug)}`} className="fa-entry-card">
      <span className="fa-meta"><bdi dir="ltr">{entry.code}</bdi><span>{new Date(entry.date).toLocaleDateString('fa-IR')}</span></span>
      <h3>{faEntryTitle(entry.slug, entry.title)}</h3>
      <p>{faEntrySummary(entry.slug, entry.summary)}</p>
    </Link>
  );
}

function FaEssayLink({ essay }: { essay: Awaited<ReturnType<typeof getEssay>> }) {
  return (
    <Link href={`/fa/essays/${essay.slug}`} className="fa-entry-card">
      <span className="fa-meta">{new Date(essay.date).toLocaleDateString('fa-IR')} <bdi dir="ltr">· {essay.readingTime}</bdi></span>
      <h3>{faEssayTitles[essay.slug] ?? essay.title}</h3>
      <p>{faEssaySummaries[essay.slug] ?? essay.summary}</p>
    </Link>
  );
}

function FaHome() {
  return (
      <div className="fa-site" lang="fa" dir="rtl">
      <div className="home-hero">
        <div className="home-hero-background" aria-hidden="true" />
        <section className="home-copy" aria-labelledby="fa-home-title">
          
          <h1 id="fa-home-title">از اندیشه تا تجربه</h1>
          <p className="home-description">مجموعه‌ای مستقل از مطالعات، تحلیل‌ها و پروژه‌ها<br />تلاشی برای درک عمیق‌تر دنیای کسب‌وکار</p>
          <Link href="/fa/mba-lab" className="home-cta"><span>ورود به کارگاه کسب و کار</span><span className="home-arrow" aria-hidden="true">←</span></Link>
        </section>
        <div className="home-journey">
          <p className="journey-title">مسیر یادگیری</p>
          <div className="fa-journey-track">
            {phases.map((phase, index) => (
              <Link key={phase.slug} href={`/fa/mba-lab/phase/${phase.slug}`} className={phase.slug === 'phase-2' ? 'fa-journey-phase active' : 'fa-journey-phase'}>
                <span>{String(index + 1).padStart(2, '0')}</span><small>{faPhases[phase.slug].name}</small>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FaTopicIndex({ entries }: { entries: Awaited<ReturnType<typeof getAllLabEntries>> }) {
  return <PageFrame hero="topics" eyebrow="جست‌وجو بر اساس موضوع" title="موضوع‌ها" intro="ایده‌های این کارگاه در مرز یک رشته متوقف نمی‌شوند. یک موضوع را دنبال کنید و پیوندهایش را میان موردها، جستارها و منابع ببینید.">
    <div className="fa-card-grid">{topics.map((topic, i) => <Link key={topic.slug} href={`/fa/topics/${topic.slug}`} className="fa-topic-card"><span className="fa-meta">{String(i + 1).padStart(2, '0')} <bdi dir="ltr">{topic.code}</bdi></span><h2>{faTopics[topic.slug].name}</h2><p>{faTopics[topic.slug].description}</p><small>{entries.filter((e) => e.topics.includes(topic.slug)).length.toLocaleString('fa-IR')} یادداشت</small></Link>)}</div>
  </PageFrame>;
}

function PageFrame({ eyebrow, title, intro, children, hero, headerBeforeTitle, headerAfterIntro }: { eyebrow?: string; title: string; intro?: string; children: React.ReactNode; hero?: 'lab' | 'topics'; headerBeforeTitle?: React.ReactNode; headerAfterIntro?: React.ReactNode }) {
  return <div className="fa-site" lang="fa" dir="rtl"><section className={`fa-page-heading${hero ? ` fa-visual-heading fa-visual-${hero}` : ''}`}>{hero && <div className={`fa-visual-art fa-art-${hero}`} aria-hidden="true" />}{hero && <div className="fa-visual-shade" aria-hidden="true" />}<div className="fa-heading-copy"><span className="fa-eyebrow">{eyebrow}</span>{headerBeforeTitle}<h1>{title}</h1>{intro && <p>{intro}</p>}{headerAfterIntro}</div></section><section className="fa-page-body">{children}</section></div>;
}

function PersianSourceFlow() {
  const steps = ['منبع', 'مطالعه', 'ترکیب مستقل', 'خروجی منتشرشده'];
  return (
    <div className="fa-source-flow" aria-label="روند تبدیل منبع به خروجی">
      {steps.map((step, index) => (
        <span className="fa-source-flow-step" key={step}>
          <span className={index === steps.length - 1 ? 'fa-source-flow-chip is-final' : 'fa-source-flow-chip'}>{step}</span>
          {index < steps.length - 1 && <span className="fa-source-flow-arrow" aria-hidden="true">←</span>}
        </span>
      ))}
    </div>
  );
}

function FaCategoryBlocks({ entries }: { entries: Awaited<ReturnType<typeof getAllLabEntries>> }) {
  return <div className="fa-category-list">{categories.map((category) => {
    const items = entries.filter((entry) => entry.category === category.slug);
    if (!items.length) return null;
    return <section key={category.slug}><h2>{faCategories[category.slug].name}</h2><FaEntryLink entry={items[0]} />{items.length > 1 && <details className="fa-load-more"><summary>نمایش {Math.max(items.length - 1, 0).toLocaleString('fa-IR')} یادداشت دیگر</summary>{items.slice(1).map((entry) => <FaEntryLink key={entry.slug} entry={entry} />)}</details>}</section>;
  })}</div>;
}

async function FaPage({ path }: { path: string[] }) {
  const route = path.join('/');
  if (!route) return <FaHome />;

  const entries = await getAllLabEntries();
  if (route === 'topics') return <FaTopicIndex entries={entries} />;
  if (route === 'mba-lab') return <PageFrame hero="lab" eyebrow="دفتر کارگاه" title="کارگاه مدیریت کسب و کار" intro="فضایی برای اندیشیدن به مسئله‌های کسب‌وکار، آزمودن ایده‌ها، ساختن پروژه‌ها و آموختن از کسانی که تجربهٔ ساختن دارند."><div className="fa-card-grid">{categories.map((category) => { const count = entries.filter((e) => e.category === category.slug).length; return <Link key={category.slug} href={`/fa/mba-lab/category/${category.slug}`} className="fa-topic-card"><span className="fa-meta">{category.code} · {count.toLocaleString('fa-IR')} یادداشت</span><h2>{faCategories[category.slug].name}</h2><p>{faCategories[category.slug].description}</p></Link>; })}</div></PageFrame>;

  if (route === 'about') return (
    <PageFrame eyebrow="دربارهٔ من" title="احمد توسلی‌نیا">
      <div className="fa-about-layout">
        <div>
          <div className="fa-prose">
            <p className="fa-lead">به مسئله‌هایی علاقه دارم که پاسخ ساده‌ای ندارند.</p>
            <p>کار و یادگیری من در پیوند میان کسب‌وکار، راهبرد، بازار، فناوری، هوش مصنوعی و کارآفرینی قرار دارد. به مسئله‌هایی جذب می‌شوم که اطلاعات ناقص است، منابع محدودند و بااین‌حال باید تصمیم گرفت.</p>
            <p>این کارگاه را ساختم تا مسیر یادگیری‌ام را عمومی کنم: ایده‌ها را بخوانم، فرض‌ها را بیازمایم، با عددها روبه‌رو شوم و ببینم آیا تحلیل در برابر واقعیت دوام می‌آورد یا نه.</p>
            <p>به‌جای جمع‌کردن دانسته‌ها، می‌خواهم از آن‌ها استفاده کنم؛ با نوشتن، تحلیل‌کردن، ساختن و آزمودن ایده‌ها.</p>
            <p>این روزها به‌ویژه به اثر هوش مصنوعی بر اقتصاد کسب‌وکارها، تغییر بازارها و مزیت رقابتی، و شیوهٔ خلق و تصاحب ارزش در محیط‌های متغیر فکر می‌کنم.</p>
          </div>
          <ul className="fa-interest-list">
            <li>کسب‌وکار و کارآفرینی</li>
            <li>استراتژی و تحلیل کسب‌وکار</li>
            <li>هوش مصنوعی</li>
            <li>فناوری و بازارها</li>
          </ul>
        </div>
        <aside className="fa-about-aside">
          <Image
            src={`${basePath}/me.jpg`}
            alt="احمد توسلی‌نیا"
            width={200}
            height={200}
            className="fa-about-photo"
            priority
          />
          <Link href="/fa/cv" className="fa-action fa-about-action">مشاهدهٔ رزومه</Link>
          <Link href="/fa/mba-lab" className="fa-action fa-about-action fa-about-secondary">رفتن به کارگاه</Link>
        </aside>
      </div>
    </PageFrame>
  );

  if (route === 'contact') return <PageFrame eyebrow="در تماس باشیم" title="تماس" intro="اگر چیزی در کارگاه پرسشی در ذهن‌تان ایجاد کرده، با آن مخالفید یا پیوند تازه‌ای به نظرتان می‌رسد، خوشحال می‌شوم بشنوم."><div className="fa-contact-grid"><section><span className="fa-eyebrow">ایمیل</span><a dir="ltr" href="mailto:amd.tavasolinia@gmail.com">amd.tavasolinia@gmail.com</a></section><section><span className="fa-eyebrow">در شبکه‌های دیگر</span><a dir="ltr" href="https://www.linkedin.com/in/ahmad-tavasolinia-0a4903202/">LinkedIn</a></section></div></PageFrame>;

  if (route === 'cv') return <PageFrame eyebrow="سوابق تحصیلی و حرفه‌ای" title="رزومه"><p className="fa-prose">نسخهٔ انگلیسی رزومه برای بارگیری در دسترس است.</p><a className="fa-action" href={`${basePath}/cv.pdf`}>بارگیری فایل PDF</a><h2 className="fa-section-title">پروژهٔ مستقل</h2><div className="fa-prose"><h3>بنیان‌گذار و نویسندهٔ کارگاه مدیریت کسب‌وکار</h3><p>پروژه‌ای مستقل برای بررسی کسب‌وکار، راهبرد، مالی، فناوری و مدیریت؛ با پیوند میان منابع دانشگاهی، مسئله‌های واقعی و تحلیل شخصی.</p><h3>تحصیلات</h3><p>مطالعهٔ مستقل در سطح تحصیلات تکمیلی: راهبرد، مالی، اقتصاد، رفتار سازمانی و پیوند هوش مصنوعی با کسب‌وکار.</p><h3>مهارت‌ها</h3><p>راهبرد، تحلیل مالی، نگارش کسب‌وکار، هوش مصنوعی و فناوری، رهبری، پژوهش و ترکیب ایده‌ها، SQL و Power BI.</p></div></PageFrame>;

  if (route === 'courses') {
    const sources = getAllSources();
    const labEntries = entries;
    return (
      <PageFrame eyebrow="خاستگاه ایده‌ها" title="کتابخانه" intro="این صفحه فهرست گواهی‌نامه‌ها نیست؛ ثبت چیزهایی است که مطالعه کردم و مهم‌تر از آن، چیزی که از این مطالعه به‌دست آمد.">
        <PersianSourceFlow />
        <div className="fa-entry-list fa-source-list">
          {sources.map((source) => {
            const faSource = faSourceNames[source.slug];
            const outputCount = labEntries.filter((entry) => source.outputs.includes(entry.slug)).length;
            return (
              <article className="fa-entry-card fa-source-card" key={source.slug}>
                <span className="fa-meta">{source.institution}</span>
                <h2><Link href={`/fa/courses/${source.slug}`}>{faSource?.course ?? source.course}</Link></h2>
                <p>{source.instructor && <>{source.instructor} · </>}{faTopics[source.subject]?.name ?? source.subject}</p>
                <p>{faSource?.why ?? source.why}</p>
                <div className="fa-source-actions">
                  <Link href={`/fa/courses/${source.slug}`} className="fa-inline-link">
                    {outputCount.toLocaleString('fa-IR')} یادداشت مرتبط · دیدن خروجی‌ها ←
                  </Link>
                  {source.courseUrl && <a className="fa-inline-link" href={source.courseUrl} target="_blank" rel="noreferrer">رفتن به منبع اصلی ←</a>}
                </div>
              </article>
            );
          })}
        </div>
        <p className="fa-disclaimer">منابع دانشگاهی برای شفافیت ذکر شده‌اند؛ هیچ‌یک از دانشگاه‌های نام‌برده این کارگاه را بررسی یا تأیید نکرده‌اند.</p>
      </PageFrame>
    );
  }

  if (route === 'essays') {
    const essays = await getAllEssays();
    return <PageFrame eyebrow="نوشتار مستقل" title="جستارها" intro="نوشته‌هایی دربارهٔ کسب‌وکار، فناوری و آیندهٔ کار که از یک درس مشخص نیامده‌اند."><div className="fa-entry-list">{essays.map((essay) => <FaEssayLink key={essay.slug} essay={essay} />)}</div></PageFrame>;
  }

  if (path[0] === 'topics' && path.length === 2) {
    const topic = topics.find((item) => item.slug === path[1]);
    if (!topic) notFound();
    const topicEntries = entries.filter((entry) => entry.topics.includes(topic.slug));
    return <PageFrame eyebrow="موضوع" title={faTopics[topic.slug].name} intro={faTopics[topic.slug].description}><FaCategoryBlocks entries={topicEntries} /></PageFrame>;
  }

  if (path[0] === 'mba-lab' && path[1] === 'category' && path.length === 3) {
    const category = categories.find((item) => item.slug === path[2]);
    if (!category) notFound();
    const matching = entries.filter((entry) => entry.category === category.slug);
    const topicOptions = topics
      .filter((topic) => matching.some((entry) => entry.topics.includes(topic.slug)))
      .map((topic) => ({ slug: topic.slug, name: faTopics[topic.slug]?.name ?? topic.name }));
    const libraryItems = matching.map((entry) => ({
      href: `/fa/mba-lab/${persianLabRouteSlug(entry.slug)}`,
      code: entry.code,
      date: new Date(entry.date).toLocaleDateString('fa-IR'),
      title: faEntryTitle(entry.slug, entry.title),
      summary: faEntrySummary(entry.slug, entry.summary),
      searchText: `${entry.title} ${entry.summary} ${entry.centralQuestion}`,
      topics: entry.topics.map((slug) => ({ slug, name: faTopics[slug]?.name ?? slug })),
    }));
    return <PageFrame eyebrow="کارگاه مدیریت کسب‌وکار" title={faCategories[category.slug].name} intro={faCategories[category.slug].description}><PersianLabLibrary items={libraryItems} topicOptions={topicOptions} /></PageFrame>;
  }

  if (path[0] === 'mba-lab' && path[1] === 'phase' && path.length === 3) {
    const phase = phases.find((item) => item.slug === path[2]);
    if (!phase) notFound();
    const phaseEntries = entries.filter((entry) => entry.journeyPhase === phase.slug);
    return <PageFrame eyebrow={faPhases[phase.slug].title} title={faPhases[phase.slug].name} intro={faPhases[phase.slug].description}><FaCategoryBlocks entries={phaseEntries} /></PageFrame>;
  }

  if (path[0] === 'mba-lab' && path.length === 2 && getLabSlugs().includes(path[1])) {
    const entry = await getLabEntry(path[1]);
    return (
      <PageFrame
        eyebrow={faCategories[entry.category].name}
        title={faEntryTitle(entry.slug, entry.title)}
        intro={faEntrySummary(entry.slug, entry.summary)}
        headerBeforeTitle={(
          <div className="fa-reading-tag-row">
            <span className="fa-reading-code"><bdi dir="ltr">{entry.code}</bdi></span>
            <Link href={`/fa/mba-lab/phase/${entry.journeyPhase}`} className="fa-entry-topic fa-phase-topic">
              {faPhases[entry.journeyPhase].title}
            </Link>
          </div>
        )}
        headerAfterIntro={(
          <>
            <div className="fa-meta fa-reading-meta">
              <time>{new Date(entry.date).toLocaleDateString('fa-IR')}</time>
              <bdi dir="ltr">{entry.readingTime}</bdi>
            </div>
            <div className="fa-entry-topics fa-reading-topics" aria-label="موضوع‌ها">
              {entry.topics.map((topic) => (
                <Link key={topic} href={`/fa/topics/${topic}`} className="fa-entry-topic">
                  {faTopics[topic]?.name ?? topic}
                </Link>
              ))}
            </div>
          </>
        )}
      >
        <p className="fa-original-note">متن کامل این یادداشت فعلاً به زبان اصلی، انگلیسی، در دسترس است.</p>
        <div className="prose-lab fa-original-content" dir="ltr" lang="en" dangerouslySetInnerHTML={{ __html: entry.contentHtml }} />
      </PageFrame>
    );
  }

  if (path[0] === 'essays' && path.length === 2 && getEssaySlugs().includes(path[1])) {
    const essay = await getEssay(path[1]);
    return (
      <PageFrame
        eyebrow="جستار"
        title={faEssayTitles[essay.slug] ?? essay.title}
        intro={faEssaySummaries[essay.slug] ?? essay.summary}
        headerAfterIntro={(
          <>
            <div className="fa-meta fa-reading-meta">
              <time>{new Date(essay.date).toLocaleDateString('fa-IR')}</time>
              <bdi dir="ltr">{essay.readingTime}</bdi>
            </div>
            <div className="fa-entry-topics fa-reading-topics" aria-label="موضوع‌ها">
              {essay.topics.map((topic) => (
                <Link key={topic} href={`/fa/topics/${topic}`} className="fa-entry-topic">
                  {faTopics[topic]?.name ?? topic}
                </Link>
              ))}
            </div>
          </>
        )}
      >
        <p className="fa-original-note">متن کامل این جستار فعلاً به زبان اصلی، انگلیسی، در دسترس است.</p>
        <div className="prose-lab fa-original-content" dir="ltr" lang="en" dangerouslySetInnerHTML={{ __html: essay.contentHtml }} />
      </PageFrame>
    );
  }

  if (path[0] === 'courses' && path.length === 2 && getSourceSlugs().includes(path[1])) {
    const source = getSource(path[1]);
    const faSource = faSourceNames[source.slug];
    const outputEntries = entries.filter((entry) => source.outputs.includes(entry.slug));
    return (
      <PageFrame eyebrow={source.institution} title={faSource?.course ?? source.course} intro={faSource?.why ?? source.why}>
        <p className="fa-prose">مدرس: {source.instructor ?? '—'} · موضوع: {faTopics[source.subject]?.name ?? source.subject}</p>
        {source.courseUrl && <a className="fa-action" href={source.courseUrl} target="_blank" rel="noreferrer">مشاهدهٔ دوره در وب‌سایت اصلی ←</a>}
        <h2 className="fa-section-title">فرآیند مطالعه</h2>
        <PersianSourceFlow />
        <h2 className="fa-section-title fa-related-title">یادداشت‌های مرتبط</h2>
        {outputEntries.length ? (
          <div className="fa-entry-list">{outputEntries.map((entry) => <FaEntryLink key={entry.slug} entry={entry} />)}</div>
        ) : (
          <p className="fa-library-empty">هنوز یادداشتی بر پایهٔ این منبع منتشر نشده است.</p>
        )}
        <p className="fa-disclaimer">این صفحه برای شفافیت، منبع دانشگاهی را معرفی می‌کند. تحلیل و نتیجه‌گیری‌ها متعلق به نویسنده‌اند و این دانشگاه کارگاه را بررسی یا تأیید نکرده است.</p>
      </PageFrame>
    );
  }

  notFound();
}

export async function renderPersianPage(path: string[]) {
  return FaPage({ path });
}
