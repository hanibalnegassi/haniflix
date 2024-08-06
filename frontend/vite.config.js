import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react({
      jsxRuntime: 'classic'
    }),

    ViteImageOptimizer({
      // Example options
      compress: true,
      quality: 80,
    }),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src')
    }
  }
});
