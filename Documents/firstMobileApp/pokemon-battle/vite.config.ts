import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          pokemon: ['./src/services/pokemonService.ts'],
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    cors: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
