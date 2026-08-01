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
        }
      }
    }`,
    { slug }
  );
  return data.blogPost;
}
