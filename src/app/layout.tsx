import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const fontVariables = {
  display: 'Georgia, \"Times New Roman\", serif',
  body: 'Arial, Helvetica, sans-serif',
  mono: '\"IBM Plex Mono\", \"Courier New\", monospace',
  nav: '\"Montserrat\", \"Avenir Next\", \"Segoe UI\", Arial, sans-serif',
  persian: '\"Vazirmatn\", Tahoma, \"Segoe UI\", \"Noto Sans Arabic\", sans-serif',
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  title: {
    default: 'MBA Lab, Ahmad Tavasolinia',
    template: '%s, MBA Lab',
  },
  description:
    'An independent intellectual laboratory exploring business, strategy, finance, technology, and leadership, synthesized from academic sources, real-world cases, and original analysis.',
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: 'MBA Lab, Ahmad Tavasolinia',
    description:
      'An independent intellectual laboratory exploring business, strategy, finance, technology, and leadership.',
    type: 'website',
  },
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="dark"
      data-theme="dark"
      style={{
        '--font-display': fontVariables.display,
        '--font-body': fontVariables.body,
        '--font-mono': fontVariables.mono,
        '--font-nav': fontVariables.nav,
        '--font-persian': fontVariables.persian,
        '--asset-home': 'url("' + basePath + '/images/home-lab-bg.png")',
        '--asset-lab': 'url("' + basePath + '/mba-lab/lab-room-reference.png")',
        '--asset-topics': 'url("' + basePath + '/topcis/topics-room-reference.png")',
      } as CSSProperties}
    >
      <body className="font-sans antialiased">
        <div className="site-bg" aria-hidden="true" />
        <div className="site-shell">
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
