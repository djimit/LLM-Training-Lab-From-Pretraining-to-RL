import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  // Server configuration with environment variable support
  const serverPort = parseInt(env['VITE_PORT'] || '3000', 10);
  const serverHost = env['VITE_HOST'] || '0.0.0.0';

  return {
    server: {
      port: serverPort,
      host: serverHost,
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    // Note: Environment variables prefixed with VITE_ are automatically
    // exposed to the client via import.meta.env
    // No need to manually define them here
  };
});
