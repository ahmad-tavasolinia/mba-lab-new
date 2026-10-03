import type { Metadata } from 'next';
import { getPersianMetadata, renderPersianPage } from '@/lib/persian-routes';

const path = ["mba-lab","heinz-and-the-problem-with-accusing-the-wrong-culprit"];

export function generateMetadata(): Metadata {
  return getPersianMetadata(path);
}

export default async function PersianStaticPage() {
  return renderPersianPage(path);
}
