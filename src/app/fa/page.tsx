import type { Metadata } from 'next';
import { getPersianMetadata, renderPersianPage } from '@/lib/persian-routes';

export function generateMetadata(): Metadata {
  return getPersianMetadata([]);
}

export default async function PersianHomePage() {
  return renderPersianPage([]);
}