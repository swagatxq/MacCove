export function formatBlogDate(dateString) {
  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function extractText(node) {
  if (!node) return '';
  if (node.type === 'span') return node.value || '';
  if (Array.isArray(node.children)) return node.children.map(extractText).join(' ');
  return '';
}

export function estimateReadingTime(dastValue) {
  const text = extractText(dastValue?.document);
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / 200));
}

export function getBrandPrimaryLink(brand) {
  return brand.website || brand.youtube || brand.twitter || brand.telegram || null;
}
