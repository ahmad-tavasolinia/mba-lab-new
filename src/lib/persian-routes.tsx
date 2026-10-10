import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllEssays, getAllLabEntries, getAllSources, getEssay, getEssaySlugs, getLabEntry, getLabSlugs, getSource, getSourceSlugs } from '@/lib/content';
import { categories } from '@/lib/categories';
import { phases } from '@/lib/phases';
import { topics } from '@/lib/topics';
import PersianLabLibrary from '@/components/PersianLabLibrary';
import { faCategories, faEntrySummary, faEntryTitle, faEssaySummaries, faEssayTitles, faPhases, faSourceNames, faTopics } from '@/lib/persian';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const persianLabRouteSlug = (slug: string) => slug.toLowerCase().replace(/'/g, '');

export function getPersianMetadata(path: string[]): Metadata {
  return { title: path.length ? 'کارگاه مدیریت کسب‌وکار' : 'کارگاه مدیریت کسب‌وکار، احمد توسلی‌نیا', description: 'یادگیری، پژوهش و ساختن در کسب‌وکار؛ به روایت احمد توسلی‌نیا.' };
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
              <Link key={phase.slug} href={`/fa/mba-lab/phase/${phase.slug}`} className={phase.slug === 'phase-1' ? 'fa-journey-phase active' : 'fa-journey-phase'}>
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

function FaExcelProject({ entry }: { entry: Awaited<ReturnType<typeof getLabEntry>> }) {
  const screenshotOrder = ['transactions', 'summary', 'income', 'monthly'];
  const screenshots = [...(entry.screenshots ?? [])].sort((a, b) => {
    const ai = screenshotOrder.findIndex((key) => [a.src, a.alt, a.caption].join(' ').toLowerCase().includes(key));
    const bi = screenshotOrder.findIndex((key) => [b.src, b.alt, b.caption].join(' ').toLowerCase().includes(key));
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
  const screenshotCopy: Record<string, { alt: string; caption: string }> = {
    'transactions.png': { alt: 'جدول تراکنش‌های مالی در اکسل', caption: 'جدول تراکنش‌ها؛ داده‌های ساختاریافته‌ای که مبنای مدل هستند.' },
    'summary.png': { alt: 'جدول خلاصهٔ محاسبات مالی در اکسل', caption: 'خلاصهٔ محاسبات؛ شاخص‌های مالی به‌دست‌آمده از جدول تراکنش‌ها.' },
    'income-and-expenses.png': { alt: 'نمودار مقایسهٔ درآمد کل و هزینهٔ کل', caption: 'درآمد و هزینه‌ها؛ مقایسهٔ تصویری مجموع درآمد و مجموع هزینه‌ها.' },
    'monthly-spending-by-category.png': { alt: 'نمودار ماهانهٔ هزینه‌ها بر اساس دسته‌بندی', caption: 'هزینهٔ ماهانه بر اساس دسته‌بندی؛ مقایسهٔ مجموع هزینه‌ها در گروه‌های مختلف.' },
  };
  const practice = [
    'جدول‌های اکسل و ارجاع‌های ساختاریافته',
    'SUMIF',
    'SUMIFS',
    'COUNTIF',
    'COUNTA',
    'MAXIFS',
    'XLOOKUP',
    'محاسبات پایه و ارجاع سلولی',
    'نمودارها برای مصورسازی داده‌های مالی',
  ];

  return (
    <PageFrame
      eyebrow={faCategories[entry.category].name}
      title={faEntryTitle(entry.slug, entry.title)}
      intro={faEntrySummary(entry.slug, entry.summary)}
      headerBeforeTitle={(
        <div className="fa-reading-tag-row">
          <span className="fa-reading-code"><bdi dir="ltr">{entry.code}</bdi></span>
          <Link href={'/fa/mba-lab/phase/' + entry.journeyPhase} className="fa-entry-topic fa-phase-topic">
            {faPhases[entry.journeyPhase].title}
          </Link>
        </div>
      )}
      headerAfterIntro={(
        <>
          <div className="fa-meta fa-reading-meta">
            <time>{new Date(entry.date).toLocaleDateString('fa-IR')}</time>
          </div>
          <div className="fa-entry-topics fa-reading-topics" aria-label="موضوع‌ها">
            {entry.topics.map((topic) => (
              <Link key={topic} href={'/fa/topics/' + topic} className="fa-entry-topic">
                {faTopics[topic]?.name ?? topic}
              </Link>
            ))}
          </div>
        </>
      )}
    >
      <p className="fa-original-note">متن اصلی به زبان انگلیسی نگاشته شده و نسخهٔ فارسی، توسط هوش مصنوعی ترجمه شده است.</p>
      <div className="fa-prose">
        <p>این پروژه را به‌صورت یک مدل مالی ساده و در سطح تراکنش در اکسل ساختم. فایل کار با یک جدول ساختاریافته از تراکنش‌ها را آغاز می‌کند و آن را به خلاصه‌ای مالی تبدیل می‌کند که درآمد، هزینه‌ها، ماندهٔ خالص، هزینه بر اساس دسته‌بندی، تعداد تراکنش‌ها، میانگین هزینه و بزرگ‌ترین هزینه را نشان می‌دهد. هدفم تمرین تبدیل داده‌های خام مالی به محاسبات و سپس رسیدن به تصویری روشن‌تر از عملکرد مالی بود.</p>
        <p>این پروژه فرصتی بود تا فرمول‌های اکسل را در یک مدل واقعی و به‌هم‌پیوسته، نه به‌صورت تمرین‌هایی جدا از هم، به‌کار ببرم. محاسبات خلاصه با استفاده از توابع شرطی و جست‌وجو روی جدول تراکنش‌ها انجام می‌شوند و نمودارها کمک می‌کنند بعضی از نتایج آسان‌تر تفسیر شوند.</p>
      </div>

      {practice.length > 0 && (
        <section className="mt-8 border-t border-rule pt-5 dark:border-dark-rule">
          <h2 className="fa-section-title">مهارت‌ها و ابزارهای تمرین‌شده</h2>
          <div className="mt-3 flex flex-wrap gap-2.5" dir="ltr">
            {practice.map((item) => (
              <span key={item} className="rounded-full border border-rule px-3 py-1.5 font-mono text-[12px] text-ink/65 dark:border-dark-rule dark:text-dark-soft">
                {item}
              </span>
            ))}
          </div>
        </section>
      )}

      {screenshots.length > 0 && (
        <section className="mt-8 border-t border-rule pt-5 dark:border-dark-rule">
          <h2 className="fa-section-title">تصاویر پروژه</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {screenshots.map((shot) => {
              const filename = shot.src.split('/').pop() ?? '';
              const copy = screenshotCopy[filename] ?? { alt: shot.alt, caption: shot.caption };
              return (
                <figure key={shot.src} className="min-w-0">
                  <a href={basePath + shot.src} target="_blank" rel="noreferrer" aria-label={'نمایش تصویر بزرگ‌تر: ' + copy.alt} className="group block overflow-hidden border border-rule bg-black/20 dark:border-dark-rule">
                    <img src={basePath + shot.src} alt={copy.alt} className="block h-32 w-full object-cover transition-opacity group-hover:opacity-80" />
                  </a>
                  <figcaption className="mt-2 text-xs leading-relaxed text-ink/60 dark:text-dark-soft/65">{copy.caption}</figcaption>
                </figure>
              );
            })}
          </div>
        </section>
      )}

      {entry.download && (
        <section className="mt-8 border-t border-rule pt-6 dark:border-dark-rule">
          <h2 className="fa-section-title">فایل اکسل پروژه</h2>
          <p className="fa-prose mt-2">برای دیدن شیوهٔ کار مدل، فایل اصلی اکسل را باز کنید و فرمول‌ها، محاسبات و داده‌های پایهٔ تراکنش‌ها را بررسی کنید.</p>
          <a href={basePath + entry.download.href} download className="fa-action mt-4 inline-flex">
            دانلود فایل اکسل ←
          </a>
        </section>
      )}
    </PageFrame>
  );
}

async function FaPage({ path }: { path: string[] }) {
  const route = path.join('/');
  if (!route) return <FaHome />;

  const allEntries = await getAllLabEntries();
  const entries = allEntries.filter((entry) => !entry.slug.toLowerCase().includes('mud-bay-and-the-hour-that-was'));
  if (route === 'topics') return <FaTopicIndex entries={entries} />;
  if (route === 'mba-lab') return <PageFrame hero="lab" eyebrow="دفتر کارگاه" title="کارگاه مدیریت کسب و کار" intro="فضایی برای اندیشیدن به مسئله‌های کسب‌وکار، آزمودن ایده‌ها، ساختن پروژه‌ها و آموختن از کسانی که تجربهٔ ساختن دارند."><div className="fa-card-grid">{categories.map((category) => { const count = entries.filter((e) => e.category === category.slug).length; return <Link key={category.slug} href={`/fa/mba-lab/category/${category.slug}`} className="fa-topic-card"><span className="fa-meta">{category.code} · {count.toLocaleString('fa-IR')} یادداشت</span><h2>{faCategories[category.slug].name}</h2><p>{faCategories[category.slug].description}</p></Link>; })}</div></PageFrame>;

  if (route === 'about') return (
    <PageFrame eyebrow="دربارهٔ من" title="احمد توسلی‌نیا">
      <div className="fa-about-layout">
        <div className="fa-prose">
          <p>همیشه برایم جالب بوده که چرا بعضی کسب‌وکارها راه خودشان را پیدا می‌کنند و رشد می‌کنند، درحالی‌که بعضی دیگر، با وجود ایده‌های خوب و تلاش زیاد، به جایی نمی‌رسند. پاسخ این سؤال‌ها معمولاً به یک عامل محدود نمی‌شود. بازار، تصمیم‌های مدیران، منابع در دسترس و حتی زمان‌بندی می‌توانند نتیجه را تغییر دهند.</p>
          <p>بخش زیادی از چیزی که این روزها می‌خوانم و دنبال می‌کنم، به همین موضوع‌ها مربوط است: استراتژی و رقابت، شناخت بازار، کارآفرینی و نقش فناوری، به‌ویژه هوش مصنوعی، در تغییر دنیای کسب‌وکار.</p>
          <p>MBA Lab فضایی است تا این یادگیری‌ها فقط به خواندن کتاب و گذراندن دوره محدود نمانند. اینجا دربارهٔ ایده‌ها می‌نویسم، مطالعه‌های موردی را بررسی می‌کنم و سعی می‌کنم بفهمم مفاهیم مدیریتی بیرون از کتاب‌ها چه معنایی پیدا می‌کنند. برایم مهم است که یک ایده را فقط به‌خاطر جذاب‌بودنش نپذیرم؛ بلکه با موشکافی آن‌ها را تحلیل کنم.</p>
          <p>هنوز سؤال‌های زیادی برایم بی‌پاسخ‌اند و احتمالاً بعضی از برداشت‌هایم هم در ادامه تغییر خواهند کرد. این سایت جایی است برای ثبت همین مسیر؛ از چیزهایی که یاد می‌گیرم تا ایده‌هایی که ارزش بررسی بیشتر دارند.</p>
        </div>
        <aside className="fa-about-aside">
          <Image
            src={basePath + '/me.jpg'}
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

  if (route === 'cv') return (
    <PageFrame eyebrow="سوابق تحصیلی و حرفه‌ای" title="رزومه">
      <a className="fa-action" href={basePath + '/cv-fa.pdf'} download>
        دانلود رزومهٔ فارسی (PDF) ←
      </a>
      <div className="fa-prose">
        <h2 className="fa-section-title">دربارهٔ من</h2>
        <p>دانش‌آموختهٔ مهندسی معماری و متقاضی کارشناسی ارشد مدیریت کسب‌وکار (MBA) در تهران هستم و از آبان‌ماه ۱۴۰۵ تحصیل در این دوره را آغاز می‌کنم. به حوزه‌های تحلیل و توسعهٔ کسب‌وکار علاقه‌مندم و به‌دنبال فرصتی برای به‌کارگیری توانمندی‌هایم و کسب تجربهٔ حرفه‌ای در محیط کسب‌وکار هستم.</p>
        <h2 className="fa-section-title">تجربهٔ حرفه‌ای</h2>
        <h3>بنیان‌گذار | باشگاه زبان انگلیسی وطن</h3>
        <p>آوریل ۲۰۲۶ تا اکنون، بیرجند</p>
        <ul>
          <li>طراحی و آزمون ایدهٔ کسب‌وکار و تبدیل آن به فعالیت درآمدزا طی دو ماه.</li>
          <li>ایجاد همکاری با یک فضای برگزاری رویداد برای تقسیم هزینه‌ها و راه‌اندازی با حداقل سرمایهٔ اولیه.</li>
          <li>طراحی قالب‌های متفاوت برای رویدادها با هدف ایجاد تمایز از کلاس‌های سنتی زبان انگلیسی.</li>
        </ul>
        <h3>مدرس زبان انگلیسی | مؤسسهٔ بین‌المللی خوارزمی</h3>
        <p>اوت ۲۰۲۴ تا ژانویهٔ ۲۰۲۶</p>
        <ul>
          <li>بیش از ۲٬۰۰۰ ساعت تدریس به بیش از ۱۵۰ زبان‌آموز؛ ارائهٔ آموزش متناسب با سطح و نیاز مخاطبان.</li>
        </ul>
        <h3>هم‌بنیان‌گذار | XpertAim</h3>
        <p>پارک علم و فناوری خراسان جنوبی، ژوئن ۲۰۲۳ تا مه ۲۰۲۴</p>
        <ul>
          <li>هدایت تیم از توسعهٔ اولیه تا ساخت محصول اولیه (MVP)، تعیین زمان‌بندی و تقسیم و پیگیری وظایف.</li>
          <li>شناخت نیاز مشتری، آزمون محصول با مشتریان و تبدیل بازخوردها به قابلیت‌ها و بهبودهای محصول.</li>
        </ul>
        <h3>خدمت نظام‌وظیفه | ارتش جمهوری اسلامی ایران</h3>
        <p>۲۰۲۱ تا ۲۰۲۳</p>
        <h3>کارآموز هماهنگی پروژه</h3>
        <p>Sustainable Alignment | زوریخ، دورکاری، مارس تا اوت ۲۰۲۱</p>
        <ul>
          <li>پژوهش و همکاری در برنامه‌ریزی و اجرای پروژه‌های پایداری، تهیهٔ محتوای شبکه‌های اجتماعی و همکاری با تیم از راه دور.</li>
        </ul>
        <h2 className="fa-section-title">تحصیلات</h2>
        <h3>کارشناسی مهندسی معماری</h3>
        <p>دانشگاه آزاد اسلامی، ۲۰۱۷ تا ۲۰۲۱</p>
        <h3>دیپلم ریاضی</h3>
        <p>۲۰۱۲ تا ۲۰۱۶</p>
        <h2 className="fa-section-title">مهارت‌ها</h2>
        <p>توسعهٔ محصول، شناخت نیاز مشتری، توسعهٔ کسب‌وکار، هماهنگی پروژه و تیم، ارتباط مؤثر، اکسل، پاورپوینت و آشنایی مقدماتی با SQL.</p>
        <h2 className="fa-section-title">زبان‌ها</h2>
        <p>آیلتس آکادمیک: نمرهٔ ۷٫۰، سطح C1، فوریهٔ ۲۰۲۲</p>
        <h2 className="fa-section-title">دوره‌های آموزشی</h2>
        <ul>
          <li>مدیریت استراتژیک | دانشکدهٔ وارتون</li>
          <li>سازوکار کسب‌وکارهای نوپا | دانشگاه MIT</li>
          <li>بازارهای مالی تطبیقی | دانشگاه MIT</li>
        </ul>
      </div>
    </PageFrame>
  );

  if (route === 'courses') {
    const sources = getAllSources();
    const labEntries = entries;
    return (
      <PageFrame eyebrow="خاستگاه ایده‌ها" title="دوره‌ها و منابع" intro="این صفحه فهرست گواهی‌نامه‌ها نیست؛ ثبت چیزهایی است که مطالعه کردم و مهم‌تر از آن، چیزی که از این مطالعه به‌دست آمد.">
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
    if (entry.slug === 'excel-financial-data-analysis') return <FaExcelProject entry={entry} />;
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
