import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { restaurant } from './src/data/restaurant.ts';
import { buildSeoMetadata, renderSeoHead } from './src/lib/seo.ts';

function restaurantSeo() {
  return {
    name: 'restaurant-seo',
    transformIndexHtml(html: string) {
      const metadata = buildSeoMetadata(restaurant);
      const seoHead = renderSeoHead(metadata, restaurant.name);

      return html.replace('<!-- restaurant-seo -->', seoHead);
    },
  };
}

export default defineConfig({
  plugins: [restaurantSeo(), react(), tailwindcss()],
});
