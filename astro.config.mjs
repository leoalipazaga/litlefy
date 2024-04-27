import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  integrations: [svelte(), tailwind(), db()],
});
