import { defineConfig } from "vite";
{% if values.uiLibrary == 'tailwind' %}
import tailwindcss from "@tailwindcss/vite";
{% endif %}
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    {% if values.uiLibrary == 'tailwind' %}
    tailwindcss(),
    {% endif %}
    react()
  ],
  server: {
    host: true,
    port: ${{ values.port }},
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  define: {
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || '${{ values.apiUrl }}'),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
});
