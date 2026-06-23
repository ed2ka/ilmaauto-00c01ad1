import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      ...(mode === "static"
        ? {
            "@/integrations/supabase/client": path.resolve(
              __dirname,
              "./src/integrations/supabase/client.static.ts"
            ),
            "@/integrations/lovable/index": path.resolve(
              __dirname,
              "./src/integrations/lovable/index.static.ts"
            ),
          }
        : {}),
    },
  },
  base: mode === "static" ? "./" : "/",
}));
