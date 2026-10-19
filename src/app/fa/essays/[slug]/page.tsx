import type { Metadata } from 'next';
import { getEssaySlugs } from '@/lib/content';
import { getPersianMetadata, renderPersianPage } from '@/lib/persian-routes';

export function generateStaticParams() {
  return getEssaySlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  return getPersianMetadata(['essays', params.slug]);
}

export default async function PersianEssayPage({ params }: { params: { slug: string } }) {
  return renderPersianPage(['essays', params.slug]);
}
