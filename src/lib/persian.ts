import type { CategorySlug, PhaseSlug, TopicSlug } from './types';

export const faTopics: Record<TopicSlug, { name: string; description: string }> = {
  strategy: { name: 'استراتژی', description: 'مزیت رقابتی چگونه ساخته، حفظ و از دست می‌رود؛ و این مسیر دربارهٔ ماهیت رقابت چه می‌گوید.' },
  finance: { name: 'مالی', description: 'سازوکار و روان‌شناسی سرمایه: قیمت‌گذاری، تخصیص و برداشت‌های نادرست از آن.' },
  marketing: { name: 'بازاریابی', description: 'ارزش چگونه به مشتری معرفی می‌شود، جایگاه می‌گیرد و در ذهن او خواستنی می‌شود.' },
  entrepreneurship: { name: 'کارآفرینی', description: 'ساختن در دل عدم‌قطعیت؛ از دیدن و آزمودن فرصت تا تبدیل آن به یک سازمان.' },
  'artificial-intelligence': { name: 'هوش مصنوعی', description: 'هوش مصنوعی چگونه هزینهٔ ساختن را تغییر می‌دهد و معنای تخصص و مزیت رقابتی را دگرگون می‌کند.' },
};

export const faCategories: Record<CategorySlug, { name: string; description: string }> = {
  cases: { name: 'مطالعهٔ موردی', description: 'بررسی مسئله‌های واقعی؛ ابتدا بدون دانستن نتیجه، سپس سنجش تحلیل با آنچه واقعاً رخ داد.' },
  essays: { name: 'جستارها', description: 'نوشته‌هایی مستقل که یک ایده را از پایه می‌سازند و دنبال می‌کنند.' },
  projects: { name: 'پروژه‌ها', description: 'کارهای کاربردی، مدل‌ها، چارچوب‌ها و چیزهایی که واقعاً ساخته شده‌اند.' },
  interviews: { name: 'گفت‌وگوها', description: 'گفت‌وگو با کسانی که در میدان کار می‌کنند؛ دربارهٔ واقعیت‌هایی که در اسلایدها نمی‌آیند.' },
};

export const faPhases: Record<PhaseSlug, { name: string; title: string; description: string }> = {
  'phase-1': { name: 'پیش از MBA', title: 'مرحلهٔ ۰۱، پیش از MBA', description: 'مطالعهٔ مستقل پیش از شروع دوره؛ بررسی موردها و ایده‌ها بدون پیش‌زمینه و به‌تنهایی.' },
  'phase-2': { name: 'در طول MBA', title: 'مرحلهٔ ۰۲، در طول MBA', description: 'درس‌ها، بحث‌های موردی و پروژه‌هایی که هم‌زمان با تحصیل شکل می‌گیرند.' },
  'phase-3': { name: 'پس از MBA', title: 'مرحلهٔ ۰۳، پس از MBA', description: 'کاربرد آموخته‌ها پس از فارغ‌التحصیلی؛ جایی که ایده‌ها در دنیای واقعی سنجیده می‌شوند.' },
};

export const faEntryTitles: Record<string, string> = {
  'bud-light-and-the-backlash-that-came-from-the-wrong-direction': 'بود لایت و واکنشی که از مسیر دیگری آمد',
  'burger-king-and-the-habit-they-were-actually-selling': 'برگر کینگ و عادتی که واقعاً می‌فروخت',
  'espn-and-the-question-underneath-the-question': 'ESPN و پرسشی که زیرِ پرسش اصلی پنهان بود',
  'excel-financial-data-analysis': 'اکسل: تحلیل داده‌های مالی',
  'ferraris-bet-against-its-own-roadmap': 'شرط فراری برخلاف نقشهٔ راه خودش',
  'formula-1-and-the-habit-of-using-what-you-already-know': 'فرمول یک و عادتِ تکیه بر دانسته‌های قبلی',
  'heinz-and-the-problem-of-accusing-the-wrong-culprit': 'هاینز و مشکل متهم‌کردنِ عامل اشتباه',
  'heinz-and-the-problem-with-accusing-the-wrong-culprit': 'هاینز و مشکل متهم‌کردنِ عامل اشتباه',
  'jaguar-and-the-trap-of-convincing-yourself': 'جگوار و دامِ قانع‌کردنِ خود',
  "mud-bay-and-the-hour-that-wasn't-actually-dead": 'ماد بِی و ساعتی که واقعاً بی‌ارزش نبود',
  'netflix-in-india-and-the-wallet-that-only-fits-one-subscription': 'نتفلیکس در هند و بودجه‌ای که فقط به یک اشتراک می‌رسد',
  'notes-from-a-science-park-what-an-incubator-director-actually-worries-about': 'یادداشت‌هایی از پارک علم و فناوری: دغدغهٔ واقعی مدیر یک مرکز رشد',
  'old-spice-and-the-answer-that-was-already-on-the-table': 'اولد اسپایس و پاسخی که از قبل پیشِ رو بود',
  'on-the-adaptive-markets-course-by-prof-andrew-lo-mit': 'دربارهٔ درس بازارهای تطبیقی، با پروفسور اندرو لو از MIT',
  'pepsi-am-and-the-room-that-already-knew': 'پپسی اِی‌اِم و اتاقی که از قبل پاسخ را می‌دانست',
  'pepsis-fifth-attempt-at-a-product-nobody-asked-for': 'پنجمین تلاش پپسی برای محصولی که کسی نخواسته بود',
  'real-burger-world-and-the-contradiction-built-into-the-name': 'ریل برگر ورلد و تناقضی که در نامش بود',
  'the-ripening-chemical-and-the-case-for-moving-first': 'مادهٔ رسیده‌کننده و استدلالِ پیش‌دستی',
  'value-creation-value-capture-and-the-business-model': 'خلق ارزش، تصاحب ارزش و مدل کسب‌وکار',
  'venture-southeast-asia-and-the-melting-ice-cube': 'سرمایه‌گذاری در جنوب‌شرق آسیا و مکعب یخی که آب می‌شود',
  'what-do-i-think-about-an-mba-right-before-starting-it-in-2026': 'در آستانهٔ شروع MBA در ۲۰۲۶، واقعاً چه فکری می‌کنم؟',
};

export const faEntrySummaries: Record<string, string> = {
  'bud-light-and-the-backlash-that-came-from-the-wrong-direction': 'بررسی کارزار بود لایت در سال ۲۰۲۳ و تفاوت میان درست‌بودن پیش‌بینی و درست‌بودنِ دلیل آن.',
  'burger-king-and-the-habit-they-were-actually-selling': 'بررسی کمپین Whopper Detour و سازوکاری که زیرِ یک حرکت وایرال پنهان بود.',
  'espn-and-the-question-underneath-the-question': 'بررسی چرخش ESPN به سمت پخش آنلاین و قیاسی که با پرسش‌گری دوام نیاورد.',
  'excel-financial-data-analysis': 'ساخت مدلی مالی در سطح تراکنش برای بررسی الگوی هزینه، جریان نقد و عملکرد مالی.',
  'ferraris-bet-against-its-own-roadmap': 'بررسی راهبرد خودروهای برقی فراری و نتیجه‌ای واقعی که از انتظار نزدیک‌تر بود.',
  'formula-1-and-the-habit-of-using-what-you-already-know': 'تمرین مصاحبهٔ موردی دربارهٔ رشد فرمول یک و حفظ شواهد محکم تا پاسخ نهایی.',
  'heinz-and-the-problem-with-accusing-the-wrong-culprit': 'بررسی کارزار «تقلب در کچاپ» هاینز و عددی که پیدا شد اما برای استدلال کافی نبود.',
  'jaguar-and-the-trap-of-convincing-yourself': 'بررسی بازبرندسازی جگوار و ایدهٔ جذابی که با منطق خودش سازگار نماند.',
  'netflix-in-india-and-the-wallet-that-only-fits-one-subscription': 'بررسی ورود به بازار هند و عددی که پیش از آزمودن، یک راهبرد کامل را کنار گذاشت.',
  "mud-bay-and-the-hour-that-wasn't-actually-dead": 'بررسی کاهش ساعت کاری فروشگاه؛ مسئله فقط محاسبه نبود، معنای درآمدِ آن ساعت هم بود.',
  'old-spice-and-the-answer-that-was-already-on-the-table': 'بررسی راهبرد اولد اسپایس و پاسخی که پیش از جست‌وجوی راه‌حل تازه، در دسترس بود.',
  'on-the-adaptive-markets-course-by-prof-andrew-lo-mit': 'برداشت‌هایی از درس اندرو لو در MIT دربارهٔ بازارهای تطبیقی، رفتار انسان و تغییرپذیری بازار.',
  'pepsi-am-and-the-room-that-already-knew': 'بررسی پپسی اِی‌اِم و نشانه‌هایی که نشان می‌داد مسئلهٔ اصلی از ابتدا شناخته شده بود.',
  'notes-from-a-science-park-what-an-incubator-director-actually-worries-about': 'گفت‌وگو با معاون یک پارک فناوری دربارهٔ کارکرد واقعی مراکز رشد و کاستی‌هایشان.',
  'pepsis-fifth-attempt-at-a-product-nobody-asked-for': 'بررسی پپسی نکست و لحظه‌ای که داده‌های خوش‌ظاهر نزدیک بود شهود معقول را کنار بزند.',
  'real-burger-world-and-the-contradiction-built-into-the-name': 'بررسی شکست یک استارتاپ برگر در بریتانیا و تغییری که بنیان‌گذاران نتوانستند بپذیرند.',
  'the-ripening-chemical-and-the-case-for-moving-first': 'بررسی خرید یک شرکت زیست‌فناوری و تفاوت دلیل واقعی با دلیلی که فقط درست به نظر می‌رسد.',
  'value-creation-value-capture-and-the-business-model': 'چرا ایدهٔ خوب فقط آغاز راه است: از خلق و ارائهٔ ارزش تا درآمد، اجرا و زمانِ کنارگذاشتن ایده.',
  'venture-southeast-asia-and-the-melting-ice-cube': 'بررسی ارزش‌گذاری سرمایه‌گذاری خصوصی و خطای محاسباتی‌ای که نتیجه را بیش از حد مرتب کرد.',
  'what-do-i-think-about-an-mba-right-before-starting-it-in-2026': 'شرط‌بندی در شرایط عدم‌قطعیت: اگر هوش مصنوعی ساختن را آسان کند، مزیت واقعی چه خواهد بود؟',
};

export const faEssayTitles: Record<string, string> = {
  'is-an-mba-still-worth-it-in-the-age-of-ai': 'آیا MBA در عصر هوش مصنوعی هنوز ارزش دارد؟',
  'the-amateur-founder-problem': 'مسئلهٔ بنیان‌گذارِ تازه‌کار',
  'when-knowledge-becomes-cheap-what-becomes-valuable': 'وقتی دانش ارزان می‌شود، چه چیزی ارزشمند می‌ماند؟',
};

export const faEssaySummaries: Record<string, string> = {
  'is-an-mba-still-worth-it-in-the-age-of-ai': 'پرسش اصلی این نیست که MBA چه می‌آموزد؛ این است که آیا همان مهارت‌ها در جهانی که هوش مصنوعی کارهای تحلیلی را ارزان می‌کند کمیاب‌تر می‌شوند یا نه.',
  'the-amateur-founder-problem': 'هوش مصنوعی مانع فنیِ ساخت محصول را برمی‌دارد؛ این اتفاق فرصت‌ساز است، اما مسئلهٔ تازه‌ای هم ایجاد می‌کند.',
  'when-knowledge-becomes-cheap-what-becomes-valuable': 'هر بار که دانشی ارزان و فراگیر می‌شود، گلوگاه تازه‌ای پدید می‌آید؛ بهتر است از پیش بپرسیم این بار چه چیزی کمیاب خواهد شد.',
};

export const faSourceNames: Record<string, { course: string; why: string }> = {
  'mit-adaptive-markets': { course: 'بازارهای تطبیقی: پویایی بازارهای مالی و رفتار انسان', why: 'می‌خواستم از همان ابتدا ذهنیتی سازگار با تغییر در خودم بسازم. این نخستین درسی بود که پیش از MBA انتخاب کردم؛ چون بازارهای عصر هوش مصنوعی آن‌قدر سریع تغییر می‌کنند که مدل‌های کلاسیکِ کنشگر عقلانی همیشه پاسخ‌گو نیستند.' },
  'mit-nuts-and-bolts-of-new-ventures': { course: 'سازوکارهای عملیِ کسب‌وکارهای نوپا', why: 'می‌خواستم فیلترهای عملی، منطق مدل کسب‌وکار، اجرا و برنامه‌ریزی مالیِ میانِ داشتن یک ایده و ساختن یک کسب‌وکار را بفهمم.' },
};

export function faEntryTitle(slug: string, fallback: string) { return faEntryTitles[slug.toLowerCase()] ?? fallback; }
export function faEntrySummary(slug: string, fallback: string) { return faEntrySummaries[slug.toLowerCase()] ?? fallback; }
