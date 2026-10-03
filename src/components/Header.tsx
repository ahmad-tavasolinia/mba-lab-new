'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/mba-lab', label: 'The Lab' },
  { href: '/topics', label: 'Topics' },
  { href: '/courses', label: 'Library' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const persianLanguageName = '\u0641\u0627\u0631\u0633\u06cc';

function HomeLanguageSwitch({ isPersian, className, routePath }: { isPersian: boolean; className: string; routePath: string }) {
  const localPath = routePath === '/' ? '' : routePath;

  return (
    <div className={`home-language-switch ${className}`} dir="ltr" role="group" aria-label={isPersian ? 'انتخاب زبان' : 'Choose language'}>
      {isPersian ? (
        <Link href={localPath || '/'} lang="en" aria-label="Switch to English">EN</Link>
      ) : (
        <span lang="en" aria-current="page">EN</span>
      )}
      <span aria-hidden="true">/</span>
      {isPersian ? (
        <span dir="rtl" lang="fa" aria-current="page">{persianLanguageName}</span>
      ) : (
        <Link href={`/fa${localPath}`} dir="rtl" lang="fa" aria-label="Switch to Persian">{persianLanguageName}</Link>
      )}
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isPersian = pathname === '/fa' || pathname?.startsWith('/fa/');
  const routePath = (isPersian ? pathname?.replace(/^\/fa(?=\/|$)/, '') : pathname) || '/';
  const isHome = routePath === '/';
  const pathSegments = routePath?.split('/').filter(Boolean) ?? [];
  const routeParent = pathSegments[pathSegments.length - 2];
  const routeSlug = pathSegments[pathSegments.length - 1];
  const isReaderPage = !isPersian && (
    routeParent === 'essays' ||
    (routeParent === 'mba-lab' && routeSlug !== 'mba-lab'));

  const localizedNavItems = navItems.map((item, index) => ({
    ...item,
    baseHref: item.href,
    href: isPersian ? `/fa${item.href === '/' ? '' : item.href}` : item.href,
    label: isPersian ? ['خانه', 'کارگاه', 'موضوع‌ها', 'کتابخانه', 'درباره', 'تماس'][index] : item.label,
  }));

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    if (href === '/') return routePath === '/';
    return routePath === href || routePath?.startsWith(href + '/');
  }

  return (
    <header lang={isPersian ? 'fa' : 'en'} dir={isPersian ? 'rtl' : 'ltr'} className={isHome ? 'site-header site-header-home' : 'site-header'}>
      <Link href={isPersian ? '/fa' : '/'} className="site-brand" aria-label={isPersian ? 'کارگاه مدیریت کسب و کار، احمد توسلی نیا' : 'MBA Lab by Ahmad Tavasolinia'}>
        <span dir={isPersian ? 'rtl' : 'ltr'} className="site-brand-name">{isPersian ? 'کارگاه مدیریت کسب و کار' : 'MBA Lab'}</span>
        <span dir={isPersian ? 'rtl' : 'ltr'} className="site-brand-byline">{isPersian ? 'احمد توسلی نیا' : 'Ahmad Tavasolinia'}</span>
      </Link>

      <div className="site-header-actions">
        <nav className="site-nav" aria-label="Site navigation">
          {localizedNavItems.map((item) => (
            <Fragment key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.baseHref) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </Fragment>
          ))}
          <HomeLanguageSwitch isPersian={isPersian} className="home-header-language-switch" routePath={routePath} />
        </nav>
        {isReaderPage && <ThemeToggle />}
      </div>

      <div className="site-menu-control">
        <button
          type="button"
          className={open ? 'site-menu-button is-open' : 'site-menu-button'}
          aria-label={isPersian ? (open ? 'بستن فهرست' : 'باز کردن فهرست') : (open ? 'Close navigation' : 'Open navigation')}
          aria-expanded={open}
          aria-controls="site-mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
        <HomeLanguageSwitch isPersian={isPersian} className="home-mobile-header-language-switch" routePath={routePath} />
      </div>

      {open && (
        <nav id="site-mobile-nav" className="site-mobile-nav" aria-label={isPersian ? 'پیمایش' : 'Mobile navigation'}>
          {localizedNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.baseHref) ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
