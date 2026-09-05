import Image from 'next/image';
import FileCutPasteNav from '../../../components/FileCutPasteNav';
import FileCutPasteFooter from '../../../components/FileCutPasteFooter';
import Reveal from '../../../components/Reveal';
import Icon from '../../../components/Icon';
import AssistantFloater from '../../../components/AssistantFloater';
import { getAllFileCutPasteBlogs } from '../../../lib/datocms';
import { formatBlogDate } from '../../../lib/format';

export const metadata = {
  title: 'FileCutPaste Blog',
  description: 'Guides and tips for cutting and pasting files on your Mac, from the FileCutPaste team.',
  alternates: { canonical: '/FileCutPasteApp/blog' },
};

export const revalidate = 60;

export default async function FileCutPasteBlogIndexPage() {
  const posts = await getAllFileCutPasteBlogs();

  return (
    <>
      <FileCutPasteNav />
      <section className="section blog-section" id="blog">
        <div className="container">
          <Reveal className="blog-header">
            <div className="blog-header-left">
              <h1 className="text-h1">From the Blog</h1>
              <p className="text-body">Guides and tips for moving files on your Mac the way you did on Windows — with ⌘X and ⌘V.</p>
            </div>
          </Reveal>
          <div className="blog-grid stagger-children">
            {posts.map((post) => (
              <a key={post.id} href={`/FileCutPasteApp/blog/${post.slug}`} className="blog-card glass">
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
      <FileCutPasteFooter />
    </>
  );
}
