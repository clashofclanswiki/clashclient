import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/auth', '/profile', '/profile/*']
      }
    ],
    sitemap: `${process.env.BASE_URL}/sitemap.xml`
  }
}
