import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    host: 'localhost',
  },
  define: {
    'process.env': {
      VITE_SECURE_LOCAL_STORAGE_HASH_KEY: 'SECRET_KEY_XD',
      VITE_SECURE_LOCAL_STORAGE_PREFIX: 'SECRET_PREFIX_XD',
      API_URL:"http://localhost:8080"
    },
  },
});
