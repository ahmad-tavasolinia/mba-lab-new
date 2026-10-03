import type { Metadata } from 'next';
import { getPersianMetadata, renderPersianPage } from '@/lib/persian-routes';

const path = ["mba-lab","Mud-Bay-and-the-Hour-That-Wasn't-Actually-Dead"];

export function generateMetadata(): Metadata {
  return getPersianMetadata(path);
}

export default async function PersianStaticPage() {
  return renderPersianPage(path);
}
