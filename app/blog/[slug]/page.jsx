import { notFound } from 'next/navigation';
import { render, renderNodeRule } from 'datocms-structured-text-to-html-string';
import NavBar from '../../../components/NavBar';
import { getAllBlogPostSlugs, getBlogPostBySlug } from '../../../lib/datocms';
import { formatBlogDate, estimateReadingTime } from '../../../lib/format';

const externalLinkRule = renderNodeRule(
  (node) => node.type === 'link',
  ({ adapter: { renderNode }, node, children, key }) => {
    const isExternal = /^https?:\/\//.test(node.url) && !node.url.includes('maccove.com');
    const attrs = isExternal ? { href: node.url, target: '_blank', rel: 'noopener noreferrer' } : { href: node.url };
    return renderNode('a', { key, ...attrs }, children);
  }
);

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} — MacCove`,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      images: post.featuredImage
        ? [{ url: post.featuredImage.url, width: post.featuredImage.width, height: post.featuredImage.height, alt: post.featuredImage.alt || post.title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} — MacCove`,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage.url] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const contentHtml = render(post.content, { customNodeRules: [externalLinkRule] });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: post.featuredImage ? [post.featuredImage.url] : undefined,
    mainEntityOfPage: `https://maccove.com/blog/${post.slug}`,
    publisher: { '@type': 'Organization', name: 'MacCove' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NavBar />
      <section className="section legal-section blog-post-section">
        <div className="container">
          <div className="legal-content blog-post-content">
            <div className="blog-meta blog-post-meta">
              {post.tag && <span className="blog-tag blog-post-tag">{post.tag}</span>}
              <span>{formatBlogDate(post.date)}</span>
              <span className="dot-sep"></span>
              <span>{estimateReadingTime(post.content)} min read</span>
            </div>
            <h1 className="text-h1">{post.title}</h1>

            {post.featuredImage && (
              <div className="blog-post-image-wrap">
                <img
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt || post.title}
                  width={post.featuredImage.width}
                  height={post.featuredImage.height}
                />
              </div>
            )}

            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />

            <p className="blog-post-back">
              <a href="/blog">&larr; Back to all articles</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
