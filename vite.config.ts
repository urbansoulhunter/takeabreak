import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const DEFAULT_SITE = 'https://takeabreaksets.com';
const DEFAULT_OG = 'https://iili.io/BQBvybI.md.jpg';

const SITEMAP_PATHS: { loc: string; changefreq: string; priority: string }[] = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/events', changefreq: 'weekly', priority: '0.9' },
  { loc: '/lineup', changefreq: 'monthly', priority: '0.8' },
  { loc: '/about', changefreq: 'monthly', priority: '0.7' },
  { loc: '/contact', changefreq: 'monthly', priority: '0.6' },
  { loc: '/join-team', changefreq: 'monthly', priority: '0.6' },
  { loc: '/terms', changefreq: 'yearly', priority: '0.3' },
  { loc: '/terms-and-conditions', changefreq: 'yearly', priority: '0.3' },
];

function seoPlugin(mode: string) {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = (env.VITE_SITE_URL || DEFAULT_SITE).replace(/\/$/, '');
  const ogImage = env.VITE_DEFAULT_OG_IMAGE?.trim() || DEFAULT_OG;

  return {
    name: 'takeabreak-seo-static',
    transformIndexHtml(html: string) {
      return html
        .replaceAll('__SITE_URL__', siteUrl)
        .replaceAll('__OG_IMAGE__', ogImage);
    },
    closeBundle() {
      const lastmod = new Date().toISOString().slice(0, 10);
      const urls = SITEMAP_PATHS.map(
        ({ loc, changefreq, priority }) => `
  <url>
    <loc>${siteUrl}${loc === '/' ? '/' : loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
      ).join('');

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>
`;

      const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

      const outDir = resolve(process.cwd(), 'dist');
      writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap, 'utf8');
      writeFileSync(resolve(outDir, 'robots.txt'), robots, 'utf8');
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), seoPlugin(mode)],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
}));
