// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { hideBrackets } from './src/lib/markdown-plugins.mjs';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://portfolio.lium.design',

  trailingSlash: 'never',
  build: { format: 'file' },
  // The page was renamed from About to Resume; keep old links working
  redirects: { '/about': '/resume' },
  integrations: [sitemap()],

  image: {
    layout: 'constrained',
    responsiveStyles: true,
    breakpoints: [480, 720, 1080, 1440, 2160],
  },

  markdown: {
    processor: satteri({ mdastPlugins: [hideBrackets] }),
  },

  vite: {
    plugins: [tailwindcss()],
  },
});