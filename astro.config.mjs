// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import baseRewrite from './base-rewrite.mjs';

// GitHub Pages serves the site under /Bushey-website, but the dev server should
// serve at the root so root-relative asset URLs (/images/…) resolve without the
// base prefix. Apply the base only for `astro build` (where base-rewrite runs).
const isBuild = process.argv.includes('build');

// https://astro.build/config
export default defineConfig({
  site: 'https://dordinator.github.io',
  base: isBuild ? '/Bushey-website' : '/',
  integrations: [baseRewrite()],
  vite: {
    plugins: [tailwindcss()]
  }
});