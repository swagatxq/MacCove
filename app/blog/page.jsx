import Image from 'next/image';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Reveal from '../../components/Reveal';
import Icon from '../../components/Icon';
import AssistantFloater from '../../components/AssistantFloater';
import { getAllBlogPosts } from '../../lib/datocms';
import { formatBlogDate } from '../../lib/format';

export const metadata = {
  title: 'The Excel Shortcuts App — Blog',
  description: 'Guides and tips for making Excel keyboard shortcuts work the Windows way on your Mac — from the team behind the Mac Excel Shortcuts app.',
  alternates: { canonical: '/blog' },
}

export const revalidate = 60;

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <NavBar />
      <section className="section blog-section" id="blog">
        <div className="container">
          <Reveal className="blog-header">
            <div className="blog-header-left">
              <h1 className="text-h1">From the Blog</h1>
              <p className="text-body">Guides, shortcut references, and Windows-to-Mac Excel tips from the team behind the Excel Shortcuts app.</p>
            </div>
          </Reveal>
          <div className="blog-grid stagger-children">
            {posts.map((post) => (
              <a key={post.id} href={`/blog/${post.slug}`} className="blog-card glass">
                <div className="blog-image-wrap">
                  {post.featuredImage && (
                    <Image
                      className="blog-image"
                      src={post.featuredImage.url}
                      alt={post.featuredImage.alt || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  {post.tag && (
                    <div className="blog-image-overlay">
                      <span className="blog-tag">{post.tag}</span>
                    </div>
                  )}
                </div>
                <div className="blog-content">
                  <div className="blog-meta">
                    <span>{formatBlogDate(post.date)}</span>
                  </div>
                  <h2 className="blog-title">{post.title}</h2>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <span className="blog-readmore">Read more <Icon id="chevron-right" size={12} /></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <AssistantFloater />
      <Footer />
    </>
  );
}
