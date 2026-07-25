export default function sitemap() {
  const baseUrl = 'https://savebill-iota.vercel.app'; // Ganti dengan domain production Anda
  
  const staticRoutes = [
    '',
    '/how-it-works',
    '/faq',
    '/about',
    '/privacy',
    '/terms',
    '/login',
    '/register',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : route === '/how-it-works' || route === '/faq' ? 0.9 : 0.8,
  }));

  // Jika Anda memiliki artikel blog publik, Anda dapat mengambilnya dari database di sini
  // dan menambahkannya ke array sitemap.

  return [...staticRoutes];
}
