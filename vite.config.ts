import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import leads from './api/leads.ts'
import delivery from './api/lead-delivery.ts'
import { send } from './server/http.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
  return {
  plugins: [react(), tailwindcss(), {
    name: 'vmg-local-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = req.url?.split('?')[0];
        const handler = pathname === '/api/leads' ? leads : pathname === '/api/lead-delivery' ? delivery : null;
        if (!handler) return next();
        void handler(req, res).catch(() => send(res, 503, { error: 'backend_unavailable' }));
      });
    },
  }],
  server: {
    host: true,
  },
  };
})
