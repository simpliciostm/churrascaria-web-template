import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { restaurant } from './src/data/restaurant.ts';
import {
  buildSeoMetadata,
  renderRobotsTxt,
  renderSeoHead,
  renderSitemapXml,
} from './src/lib/seo.ts';

function restaurantSeo(): Plugin {
  return {
    name: 'restaurant-seo',
    transformIndexHtml(html: string) {
      const metadata = buildSeoMetadata(restaurant);
      const seoHead = renderSeoHead(metadata, restaurant.name);

      return html.replace('<!-- restaurant-seo -->', seoHead);
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: renderRobotsTxt(restaurant),
      });

      const sitemap = renderSitemapXml(restaurant);

      if (sitemap) {
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: sitemap,
        });
      }
    },
  };
}

export default defineConfig({
  plugins: [restaurantSeo(), react(), tailwindcss()],
});
