import { getAllEssays, getAllLabEntries } from '@/lib/content';

export const dynamic = 'force-static';

const SITE_URL = 'https://example.com';

function escapeXml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const essays = await getAllEssays();
  const labEntries = await getAllLabEntries();

  const items = [
    ...essays.map((e) => ({
      title: e.title,
      link: `${SITE_URL}/essays/${e.slug}`,
      description: e.summary,
      date: e.date,
    })),
    ...labEntries.map((e) => ({
      title: e.title,
      link: `${SITE_URL}/mba-lab/${e.slug}`,
      description: e.summary,
      date: e.date,
    })),
  ].sort((a, b) => (a.date < b.date ? 1 : -1));

  const itemsXml = items
    .map(
      (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <guid>${item.link}</guid>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <description>${escapeXml(item.description)}</description>
    </item>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>MBA Lab, Ahmad Tavasolinia</title>
    <link>${SITE_URL}</link>
    <description>Essays and MBA Lab entries on business, strategy, and technology.</description>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
