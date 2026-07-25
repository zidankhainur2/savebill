export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/settings/', '/api/', '/simulator/', '/ai-advisor/'], // Mencegah bot meng-crawl area privat
    },
    sitemap: 'https://savebill-iota.vercel.app/sitemap.xml',
  }
}
