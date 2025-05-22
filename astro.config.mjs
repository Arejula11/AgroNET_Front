import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import auth from "auth-astro";
// import node from "@astrojs/node";
import fs from "fs";
import vercel from '@astrojs/vercel';

// Configuración de HTTPS condicional
const httpsConfig = (() => {
  try {
    const keyPath = "./certs/privkey.pem";
    const certPath = "./certs/fullchain.pem";
    
    if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
      console.log("Certificados HTTPS encontrados");
      return {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath)
      };
    }
    console.log("No se encontraron certificados HTTPS");
    return undefined;
  } catch (error) {
    console.warn("No se pudieron cargar los certificados HTTPS:", error.message);
    return undefined;
  }
})();

// https://astro.build/config
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 4321,
    ...(httpsConfig ? { https: httpsConfig } : {})
  },
  output: "server",
  devToolbar: {
    enabled: false
  },
  vite: {
    build: {
      cssMinify: false
    },
    plugins: [tailwindcss()]
  },
  integrations: [react(), auth()],
  adapter: vercel()
});
