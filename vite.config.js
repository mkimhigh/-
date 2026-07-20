import { cloudflare } from '@cloudflare/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig(async () => ({
  plugins: [
    cloudflare({
      viteEnvironment: { name: 'server' },
      config: {
        main: './worker/index.js',
        compatibility_flags: ['nodejs_compat'],
      },
    }),
  ],
}));
