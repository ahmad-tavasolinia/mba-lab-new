'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/mba-lab', label: 'MBA Lab' },
  { href: '/topics', label: 'Topics' },
  { href: '/essays', label: 'Essays' },
  { href: '/courses', label: 'Courses & Sources' },
  { href: '/about', label: 'About Ahmad' },
  { href: '/cv', label: 'CV' },
  { href: '/contact', label: 'Contact' },
  { href: '/rss.xml', label: 'RSS' },
];

export default function Footer() {
  const pathname = usePathname();
  const routePath = pathname?.replace(/\/+$/, '') || '/';
  const isPersian = routePath === '/fa' || routePath.startsWith('/fa/');
  if (routePath === '/' || routePath === '/fa') return null;

  return (
    <footer lang={isPersian ? 'fa' : 'en'} className="site-footer" dir={isPersian ? 'rtl' : 'ltr'}>
      <div className="site-footer-inner">
        <div className="site-footer-top">
          <p className="site-footer-brand">
            {isPersian ? 'کارگاه مدیریت کسب و کار' : 'MBA Lab'}
            <span>{isPersian ? 'روایتی مستقل از مسیر یادگیری.' : 'is an independent record of study.'}</span>
          </p>
          <nav className="site-footer-links" aria-label={isPersian ? 'پیوندهای پایانی' : 'Footer navigation'}>
            {links.map((link, index) => (
              <Link key={link.href} href={isPersian && link.href !== '/rss.xml' ? `/fa${link.href}` : link.href}>
                {isPersian ? ['کارگاه', 'موضوع‌ها', 'جستارها', 'دوره‌ها و منابع', 'دربارهٔ احمد', 'رزومه', 'تماس', 'خوراک RSS'][index] : link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="site-footer-meta">
          <p>{isPersian ? `© ${new Date().getFullYear()} احمد توسلی‌نیا. کارگاه مدیریت کسب و کار پروژه‌ای شخصی و مستقل است.` : `© ${new Date().getFullYear()} Ahmad Tavasolinia. MBA Lab is an independent personal project.`}</p>
          {!isPersian && <p>Not affiliated with or endorsed by any university named within.</p>}
        </div>
      </div>
    </footer>
  );
}
