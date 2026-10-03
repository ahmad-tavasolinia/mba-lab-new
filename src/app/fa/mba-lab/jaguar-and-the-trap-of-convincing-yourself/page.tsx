import type { Metadata } from 'next';
import { getPersianMetadata, renderPersianPage } from '@/lib/persian-routes';

const path = ["mba-lab","jaguar-and-the-trap-of-convincing-yourself"];

export function generateMetadata(): Metadata {
  return getPersianMetadata(path);
}

export default async function PersianStaticPage() {
  return renderPersianPage(path);
}
