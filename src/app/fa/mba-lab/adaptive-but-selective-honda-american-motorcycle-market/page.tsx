import type { Metadata } from 'next';
import { getPersianMetadata, renderPersianPage } from '@/lib/persian-routes';

const path = ["mba-lab","adaptive-but-selective-honda-american-motorcycle-market"];

export function generateMetadata(): Metadata {
  return getPersianMetadata(path);
}

export default async function PersianStaticPage() {
  return renderPersianPage(path);
}
