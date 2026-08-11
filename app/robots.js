export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/payment/success', '/payment/failure', '/buy', '/download'],
      },
    ],
    sitemap: 'https://maccove.com/sitemap.xml',
  };
}
