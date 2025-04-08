import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: 'bundle-analysis.html',
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@mui/material': '@mui/material',
      '@emotion/react': '@emotion/react',
      '@emotion/styled': '@emotion/styled',
      styles: path.resolve(__dirname, './src/styles'),
    },
  },
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: false,
    },
    cors: true,
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 2000,
    minify: 'terser',
    sourcemap: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom', 'react-redux'],
          'ui-vendor': [
            '@mui/material',
            '@emotion/react',
            '@emotion/styled',
            '@mui/icons-material',
          ],
          'utils-vendor': ['lodash', 'axios', 'date-fns'],
          'charts-vendor': ['recharts', 'chart.js'],
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
      },
    },
  },
  css: {
    // <-- نقل إعدادات CSS إلى المكان الصحيح
    postcss: {
      configFilePath: './postcss.config.cjs',
    },
    modules: {
      localsConvention: 'camelCase',
    },
  },
  optimizeDeps: {
    include: [
      'axios',
      'chart.js',
      'react',
      'react-dom',
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
      'sonner',
      'react-redux',
    ],
    exclude: ['js-big-decimal'],
  },
});
