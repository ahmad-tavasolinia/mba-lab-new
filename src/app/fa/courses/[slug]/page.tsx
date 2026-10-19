import type { Metadata } from 'next';
import { getSourceSlugs } from '@/lib/content';
import { getPersianMetadata, renderPersianPage } from '@/lib/persian-routes';

export function generateStaticParams() {
  return getSourceSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  return getPersianMetadata(['courses', params.slug]);
}

export default async function PersianSourcePage({ params }: { params: { slug: string } }) {
  return renderPersianPage(['courses', params.slug]);
}
