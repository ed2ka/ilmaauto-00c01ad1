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
    alias: [
      ...(mode === "static"
        ? [
            {
              find: "@/integrations/supabase/client",
              replacement: path.resolve(__dirname, "./src/integrations/supabase/client.static.ts"),
            },
            {
              find: "@/integrations/lovable/index",
              replacement: path.resolve(__dirname, "./src/integrations/lovable/index.static.ts"),
            },
            {
              // Catch the relative import inside lovable/index.ts (if it still ends up bundled).
              find: /^.*\/integrations\/supabase\/client$/,
              replacement: path.resolve(__dirname, "./src/integrations/supabase/client.static.ts"),
            },
          ]
        : []),
      { find: "@", replacement: path.resolve(__dirname, "./src") },
    ],
  },
  base: mode === "static" ? "./" : "/",
}));
