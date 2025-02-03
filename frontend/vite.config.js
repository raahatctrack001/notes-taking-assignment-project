import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Backend URL
        secure: false, // Disable SSL for local dev
        changeOrigin: true, // Change origin to match backend
        // rewrite: (path) => path.replace(/^\/api/, ""), // Remove `/api` prefix before forwarding to backend
      },
    },
  },
  plugins: [react()],
});
