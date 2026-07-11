const ENDPOINT = 'https://graphql.datocms.com/';

export async function datocms(query, variables = {}) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.DATAO_CMS_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  const { data, errors } = await res.json();
  if (errors) {
    throw new Error(errors.map((e) => e.message).join('\n'));
  }
  return data;
}

const BLOG_POST_CARD_FIELDS = `
  id
  title
  slug
  excerpt
  tag
  date
  featuredImage {
    url
    alt
    width
    height
  }
`;

export async function getAllBlogPosts({ first } = {}) {
  const data = await datocms(
    `query AllBlogPosts($first: IntType) {
      allBlogPosts(orderBy: date_DESC, first: $first) {
        ${BLOG_POST_CARD_FIELDS}
      }
    }`,
    { first }
  );
  return data.allBlogPosts;
}

export async function getAllBlogPostSlugs() {
  const data = await datocms(`{
    allBlogPosts {
      slug
    }
  }`);
  return data.allBlogPosts.map((post) => post.slug);
}

export async function getBlogPostBySlug(slug) {
  const data = await datocms(
    `query BlogPostBySlug($slug: String) {
      blogPost(filter: { slug: { eq: $slug } }) {
        ${BLOG_POST_CARD_FIELDS}
        content {
          value
          blocks {
            __typename
            ... on ImageBlockRecord {
              id
              asset {
                url
                alt
                width
                height
              }
            }
          }
        }
      }
    }`,
    { slug }
  );
  return data.blogPost;
}
