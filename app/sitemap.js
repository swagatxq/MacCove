import { getAllBlogPosts, getAllMerchandiseSlugs } from '../lib/datocms';

const BASE_URL = 'https://maccove.com';

export const revalidate = 3600;

export default async function sitemap() {
  const [posts, merchandiseSlugs] = await Promise.all([
    getAllBlogPosts(),
    getAllMerchandiseSlugs(),
  ]);

  const staticRoutes = [
    { url: `${BASE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/download`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/shop`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/blog`, changeFrequency: 'daily', priority: 0.7 },
    { url: `${BASE_URL}/affiliate`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/brand-affiliates`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/lp/excel-shortcuts-mac`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/lp/navigation-shortcuts-mac`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/lp/paste-shortcuts-mac`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const postRoutes = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const shopRoutes = merchandiseSlugs.map((slug) => ({
    url: `${BASE_URL}/shop/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes, ...shopRoutes];
}
