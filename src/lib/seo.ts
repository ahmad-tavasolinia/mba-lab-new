import type { Metadata } from 'next';

const SITE_ORIGIN = 'https://tavasolinia.com';
const SOCIAL_IMAGE = `${SITE_ORIGIN}/og-image.png`;

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  socialTitle?: string;
  documentTitle?: string;
  type?: 'website' | 'article';
};

function canonicalPath(path: string): string {
  const segments = path.split('/').filter(Boolean);
  return segments.length ? `/${segments.join('/')}/` : '/';
}

export function createPageMetadata({
  title,
  description,
  path,
  socialTitle = `${title} | MBA Lab`,
  documentTitle,
  type = 'website',
}: PageMetadataOptions): Metadata {
  const canonical = new URL(canonicalPath(path), SITE_ORIGIN).toString();
  const image = {
    url: SOCIAL_IMAGE,
    width: 1200,
    height: 630,
    alt: 'MBA Lab by Ahmad Tavasolinia',
  };

  return {
    title: documentTitle ? { absolute: documentTitle } : title,
    description,
    alternates: { canonical },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      siteName: 'MBA Lab',
      type,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [SOCIAL_IMAGE],
    },
  };
}
