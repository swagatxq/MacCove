const DISALLOW = ['/payment/success', '/payment/failure', '/payment/cancel', '/buy', '/download'];

const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'PerplexityBot',
  'ClaudeBot',
  'anthropic-ai',
  'Google-Extended',
  'CCBot',
  'Bytespider',
];

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOW,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: DISALLOW,
      })),
    ],
    sitemap: 'https://maccove.com/sitemap.xml',
  };
}
