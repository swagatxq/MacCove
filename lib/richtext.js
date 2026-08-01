import { render, renderNodeRule } from 'datocms-structured-text-to-html-string';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderDastSpan(span) {
  const text = escapeHtml(span.value);
  const marks = span.marks || [];
  const bold = marks.includes('strong');
  const italic = marks.includes('emphasis');
  const withItalic = italic ? `<em>${text}</em>` : text;
  return bold ? `<strong>${withItalic}</strong>` : withItalic;
}

function renderDastCell(dast) {
  const children = dast?.document?.children || [];
  return children
    .map((node) => (node.children || []).map(renderDastSpan).join(''))
    .join(' ');
}

export function renderHtmlTableBlock(htmlTable) {
  const rows = htmlTable?.data || [];
  const bodyRows = rows
    .map((row) => {
      const cells = row
        .map((cell) => {
          const tag = cell.isBold ? 'th' : 'td';
          const style = cell.isItalic && !cell.isBold ? ' style="font-style: italic;"' : '';
          return `<${tag}${style}>${renderDastCell(cell.value)}</${tag}>`;
        })
        .join('');
      return `<tr>${cells}</tr>`;
    })
    .join('');
  const caption = htmlTable?.title ? `<caption>${escapeHtml(htmlTable.title)}</caption>` : '';
  return `<table class="blog-post-table">${caption}<tbody>${bodyRows}</tbody></table>`;
}

const externalLinkRule = renderNodeRule(
  (node) => node.type === 'link',
  ({ adapter: { renderNode }, node, children, key }) => {
    const isExternal = /^https?:\/\//.test(node.url) && !node.url.includes('maccove.com');
    const attrs = isExternal ? { href: node.url, target: '_blank', rel: 'noopener noreferrer' } : { href: node.url };
    return renderNode('a', { key, ...attrs }, children);
  }
);

export function renderRichText(field) {
  if (!field) return '';
  return render(field, {
    customNodeRules: [externalLinkRule],
    renderBlock: ({ record, adapter }) => {
      if (record.__typename === 'ImageBlockRecord' && record.asset) {
        const { url, alt, width, height } = record.asset;
        return adapter.renderNode('img', {
          src: url,
          alt: alt || '',
          width: String(width),
          height: String(height),
          loading: 'lazy',
        });
      }
      if (record.__typename === 'HtmlTableRecord' && record.htmlTable) {
        return adapter.renderNode('div', {
          class: 'blog-post-table-wrap',
          dangerouslySetInnerHTML: { __html: renderHtmlTableBlock(record.htmlTable) },
        });
      }
      return null;
    },
  }) || '';
}

function extractPlainNode(node) {
  if (!node) return '';
  if (node.type === 'span') return node.value || '';
  if (Array.isArray(node.children)) return node.children.map(extractPlainNode).join(' ');
  return '';
}

export function plainText(field) {
  return extractPlainNode(field?.value?.document);
}
