// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { hideBrackets } from './src/lib/markdown-plugins.mjs';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: replace with the real domain once it's chosen (open item in the spec).
  site: 'https://malinlilja.se',

  trailingSlash: 'never',
  build: { format: 'file' },
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