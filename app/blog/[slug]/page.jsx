import Image from 'next/image';
import { notFound } from 'next/navigation';
import NavBar from '../../../components/NavBar';
import Footer from '../../../components/Footer';
import AssistantFloater from '../../../components/AssistantFloater';
import { getAllBlogPostSlugs, getBlogPostBySlug, getRelatedBlogPosts } from '../../../lib/datocms';
import { formatBlogDate, estimateReadingTime } from '../../../lib/format';
import { renderRichText } from '../../../lib/richtext';

const FALLBACK_OG_IMAGE = { url: 'https://maccove.com/AppScreenshot.webp', width: 2206, height: 1186, alt: 'Mac Excel Shortcuts app screenshot' };

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return {};
  const ogImage = post.featuredImage
    ? { url: post.featuredImage.url, width: post.featuredImage.width, height: post.featuredImage.height, alt: post.featuredImage.alt || post.title }
    : FALLBACK_OG_IMAGE;
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
      modifiedTime: post._updatedAt || post.date,
      authors: ['https://maccove.com/#founder'],
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} — MacCove`,
      description: post.excerpt,
      images: [ogImage.url],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedBlogPosts(post.slug, { first: 3, tag: post.tag });

  const contentHtml = renderRichText(post.content);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post._updatedAt || post.date,
    author: { '@type': 'Person', name: 'Swagat Sarma' },
    image: post.featuredImage ? [post.featuredImage.url] : [FALLBACK_OG_IMAGE.url],
    mainEntityOfPage: `https://maccove.com/blog/${post.slug}`,
    publisher: { '@type': 'Organization', name: 'MacCove', logo: { '@type': 'ImageObject', url: 'https://maccove.com/icon.png' } },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://maccove.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://maccove.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://maccove.com/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
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
                <Image
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt || post.title}
                  width={post.featuredImage.width}
                  height={post.featuredImage.height}
                />
              </div>
            )}

            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />

            {relatedPosts.length > 0 && (
              <div className="blog-related-posts">
                <h2 className="text-h3">Related Articles</h2>
                <div className="blog-related-posts-list">
                  {relatedPosts.map((related) => (
                    <a key={related.slug} href={`/blog/${related.slug}`} className="blog-related-post-link">
                      {related.title}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <p className="blog-post-back">
              <a href="/blog">&larr; Back to all articles</a>
            </p>
          </div>
        </div>
      </section>
      <AssistantFloater />
      <Footer />
    </>
  );
}
