// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import baseRewrite from './base-rewrite.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://dordinator.github.io',
  base: '/Bushey-website',
  integrations: [baseRewrite()],
  vite: {
    plugins: [tailwindcss()]
  }
});