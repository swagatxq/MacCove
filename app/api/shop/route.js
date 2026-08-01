import { NextResponse } from 'next/server';
import { getMerchandisePage } from '../../../lib/datocms';

const PAGE_SIZE = 6;
const MAX_PAGE_SIZE = 24;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const skip = Math.max(0, Number(searchParams.get('skip')) || 0);
  const first = Math.min(MAX_PAGE_SIZE, Math.max(1, Number(searchParams.get('first')) || PAGE_SIZE));
  const category = searchParams.get('category') || undefined;
  const country = searchParams.get('country') || undefined;
  const search = searchParams.get('q')?.trim() || undefined;
  const excludeSlug = searchParams.get('exclude') || undefined;

  const { items, total } = await getMerchandisePage({ skip, first, category, country, search, excludeSlug });

  return NextResponse.json({
    items,
    total,
    hasMore: skip + items.length < total,
  });
}
