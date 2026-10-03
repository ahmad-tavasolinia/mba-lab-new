import type { Metadata } from 'next';
import { getPersianMetadata, renderPersianPage } from '@/lib/persian-routes';

const path = ["mba-lab","notes-from-a-science-park-what-an-incubator-director-actually-worries-about"];

export function generateMetadata(): Metadata {
  return getPersianMetadata(path);
}

export default async function PersianStaticPage() {
  return renderPersianPage(path);
}
