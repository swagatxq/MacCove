export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/payment/success', '/payment/failure', '/payment/cancel', '/buy', '/download'],
      },
    ],
    sitemap: 'https://maccove.com/sitemap.xml',
  };
}
