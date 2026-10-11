import type { Metadata } from 'next';
import { getPersianMetadata, renderPersianPage } from '@/lib/persian-routes';

const path = ['mba-lab', 'sql-business-analysis-sales-performance'];

export function generateMetadata(): Metadata {
  return getPersianMetadata(path);
}

export default async function PersianSqlProjectPage() {
  return renderPersianPage(path);
}
