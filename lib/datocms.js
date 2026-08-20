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
  _updatedAt
  featuredImage {
    url
    alt
    width
    height
  }
`;

export async function getAllBlogPosts({ first } = {}) {
  if (first) {
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

  // No limit given: caller wants every post. DatoCMS's GraphQL CDA caps `first`
  // at 100 per request and silently defaults to 20 if omitted, so paginate
  // with skip until a short page tells us we've reached the end.
  const PAGE_SIZE = 100;
  let skip = 0;
  let allPosts = [];
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const data = await datocms(
      `query AllBlogPostsPage($first: IntType, $skip: IntType) {
        allBlogPosts(orderBy: date_DESC, first: $first, skip: $skip) {
          ${BLOG_POST_CARD_FIELDS}
        }
      }`,
      { first: PAGE_SIZE, skip }
    );
    allPosts = allPosts.concat(data.allBlogPosts);
    if (data.allBlogPosts.length < PAGE_SIZE) break;
    skip += PAGE_SIZE;
  }
  return allPosts;
}

export async function getAllBlogPostSlugs() {
  // Same pagination caveat as getAllBlogPosts: an unbounded `allBlogPosts`
  // query silently caps at 20 results, so page through with skip.
  const PAGE_SIZE = 100;
  let skip = 0;
  let slugs = [];
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const data = await datocms(
      `query AllBlogPostSlugsPage($first: IntType, $skip: IntType) {
        allBlogPosts(first: $first, skip: $skip) {
          slug
        }
      }`,
      { first: PAGE_SIZE, skip }
    );
    slugs = slugs.concat(data.allBlogPosts.map((post) => post.slug));
    if (data.allBlogPosts.length < PAGE_SIZE) break;
    skip += PAGE_SIZE;
  }
  return slugs;
}

const BRAND_AFFILIATE_CARD_FIELDS = `
  id
  name
  logo {
    url
    alt
  }
  image {
    url
    alt
    width
    height
  }
  website
  twitter
  youtube
  telegram
`;

export async function getBrandAffiliates({ first } = {}) {
  const data = await datocms(
    `query BrandAffiliates($first: IntType) {
      allBrandAffiliates(orderBy: position_ASC, first: $first) {
        ${BRAND_AFFILIATE_CARD_FIELDS}
      }
    }`,
    { first }
  );
  return data.allBrandAffiliates;
}

const STRUCTURED_TEXT_BLOCKS = `
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
    ... on HtmlTableRecord {
      id
      htmlTable
    }
  }
  links {
    __typename
    ... on MerchandiseRecord {
      id
      title
      slug
    }
  }
`;

const MERCHANDISE_CARD_FIELDS = `
  id
  slug
  title
  marketingTitle
  description {
    value
  }
  category
  country
  customerReview {
    value
  }
  customerRating
  affiliateLink
  asin
  videoUrl
  photo {
    url
    alt
    width
    height
  }
`;

async function getMerchandiseByCountry({ first, country }) {
  const data = await datocms(
    `query MerchandiseByCountry($first: IntType, $country: String) {
      allMerchandises(orderBy: position_ASC, first: $first, filter: { country: { eq: $country } }) {
        ${MERCHANDISE_CARD_FIELDS}
      }
    }`,
    { first, country }
  );
  return data.allMerchandises;
}

export async function getMerchandise({ first, country } = {}) {
  if (country) {
    const items = await getMerchandiseByCountry({ first, country });
    if (items.length > 0) return items;
  }
  return getMerchandiseByCountry({ first, country: 'US' });
}

export async function getAllMerchandise({ first } = {}) {
  const data = await datocms(
    `query AllMerchandisesUnfiltered($first: IntType) {
      allMerchandises(orderBy: position_ASC, first: $first) {
        ${MERCHANDISE_CARD_FIELDS}
      }
    }`,
    { first }
  );
  return data.allMerchandises;
}

export async function getMerchandiseWithVideo({ first = 5 } = {}) {
  const data = await datocms(
    `query MerchandiseWithVideo($first: IntType) {
      allMerchandises(orderBy: position_ASC, first: $first, filter: { videoUrl: { isPresent: true } }) {
        ${MERCHANDISE_CARD_FIELDS}
      }
    }`,
    { first }
  );
  return data.allMerchandises;
}

export async function getMerchandisePage({ skip = 0, first = 6, category, country, search, excludeSlug } = {}) {
  const conditions = [];
  const varDecls = ['$skip: IntType', '$first: IntType'];
  const variables = { skip, first };

  if (category) {
    conditions.push('category: { eq: $category }');
    varDecls.push('$category: String');
    variables.category = category;
  }
  if (country) {
    conditions.push('country: { eq: $country }');
    varDecls.push('$country: String');
    variables.country = country;
  }
  if (search) {
    conditions.push(
      'OR: [{ title: { matches: { pattern: $search, caseSensitive: false } } }, { description: { matches: { pattern: $search, caseSensitive: false } } }]'
    );
    varDecls.push('$search: String!');
    variables.search = search;
  }
  if (excludeSlug) {
    conditions.push('slug: { neq: $excludeSlug }');
    varDecls.push('$excludeSlug: String');
    variables.excludeSlug = excludeSlug;
  }

  const filterClause = conditions.length ? `filter: { ${conditions.join(', ')} }` : '';

  const data = await datocms(
    `query MerchandisePage(${varDecls.join(', ')}) {
      allMerchandises(skip: $skip, first: $first, orderBy: position_ASC${filterClause ? `, ${filterClause}` : ''}) {
        ${MERCHANDISE_CARD_FIELDS}
      }
      _allMerchandisesMeta${filterClause ? `(${filterClause})` : ''} {
        count
      }
    }`,
    variables
  );

  return { items: data.allMerchandises, total: data._allMerchandisesMeta.count };
}

export async function getMerchandiseFacets() {
  const data = await datocms(`{
    allMerchandises {
      category
      country
    }
  }`);
  return {
    categories: Array.from(new Set(data.allMerchandises.map((item) => item.category).filter(Boolean))),
    countries: Array.from(new Set(data.allMerchandises.map((item) => item.country).filter(Boolean))),
  };
}

export async function getAllMerchandiseSlugs() {
  const data = await datocms(`{
    allMerchandises {
      slug
    }
  }`);
  return data.allMerchandises.map((item) => item.slug);
}

export async function getMerchandiseBySlug(slug) {
  const data = await datocms(
    `query MerchandiseBySlug($slug: String) {
      merchandise(filter: { slug: { eq: $slug } }) {
        ${MERCHANDISE_CARD_FIELDS}
        whyMacUsers {
          value
          ${STRUCTURED_TEXT_BLOCKS}
        }
        gallery {
          url
          alt
          width
          height
        }
      }
    }`,
    { slug }
  );
  return data.merchandise;
}

export async function getRelatedBlogPosts(currentSlug, { first = 3, tag } = {}) {
  if (tag) {
    const data = await datocms(
      `query RelatedBlogPostsByTag($first: IntType, $slug: String, $tag: String) {
        allBlogPosts(orderBy: date_DESC, first: $first, filter: { slug: { neq: $slug }, tag: { eq: $tag } }) {
          ${BLOG_POST_CARD_FIELDS}
        }
      }`,
      { first, slug: currentSlug, tag }
    );
    if (data.allBlogPosts.length >= first) return data.allBlogPosts;

    const fallback = await datocms(
      `query RelatedBlogPostsFallback($first: IntType, $slug: String) {
        allBlogPosts(orderBy: date_DESC, first: $first, filter: { slug: { neq: $slug } }) {
          ${BLOG_POST_CARD_FIELDS}
        }
      }`,
      { first, slug: currentSlug }
    );
    const seen = new Set(data.allBlogPosts.map((p) => p.slug));
    return [...data.allBlogPosts, ...fallback.allBlogPosts.filter((p) => !seen.has(p.slug))].slice(0, first);
  }

  const data = await datocms(
    `query RelatedBlogPosts($first: IntType, $slug: String) {
      allBlogPosts(orderBy: date_DESC, first: $first, filter: { slug: { neq: $slug } }) {
        ${BLOG_POST_CARD_FIELDS}
      }
    }`,
    { first, slug: currentSlug }
  );
  return data.allBlogPosts;
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
            ... on HtmlTableRecord {
              id
              htmlTable
            }
          }
          links {
            __typename
            ... on BlogPostRecord {
              id
              title
              slug
            }
          }
        }
      }
    }`,
    { slug }
  );
  return data.blogPost;
}
