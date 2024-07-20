import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Manually split vendor libraries into separate chunks
          vendor: ['react', 'react-dom'],
          // You can add more custom chunks here if needed
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust the limit as needed (default is 500 kB)
  },
});
