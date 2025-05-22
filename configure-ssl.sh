#!/bin/bash
# Script para configurar SSL con Let's Encrypt para Astro

# Actualizar paquetes
sudo dnf update -y
sudo dnf install -y certbot

# Detener temporalmente el servicio Astro para liberar el puerto
sudo systemctl stop astro-frontend

# Obtener el certificado con certbot
sudo certbot certonly --standalone --preferred-challenges http \
  -d www.agronet.are-dev.es \
  --agree-tos -m admin@agronet.are-dev.es \
  --non-interactive

# Verificar si se obtuvo el certificado correctamente
if [ -d "/etc/letsencrypt/live/www.agronet.are-dev.es" ]; then
  echo "Certificado obtenido correctamente"
  
  # Crear directorio para almacenar los certificados de Astro
  sudo mkdir -p /home/frontend-app/Frontend/certs
  
  # Copiar los certificados a la ubicación de Astro
  sudo cp /etc/letsencrypt/live/www.agronet.are-dev.es/fullchain.pem /home/frontend-app/Frontend/certs/
  sudo cp /etc/letsencrypt/live/www.agronet.are-dev.es/privkey.pem /home/frontend-app/Frontend/certs/
  
  # Ajustar permisos
  sudo chown -R frontend-app:frontend-app /home/frontend-app/Frontend/certs
  sudo chmod 700 /home/frontend-app/Frontend/certs
  sudo chmod 600 /home/frontend-app/Frontend/certs/*.pem
  
  # Modificar astro.config.mjs para utilizar HTTPS
  sudo -u frontend-app bash -c 'cat > /home/frontend-app/Frontend/astro.config.mjs << EOL
// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import auth from "auth-astro";
import node from "@astrojs/node";
import fs from "fs";

// https://astro.build/config
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 4321,
    https: {
      key: fs.readFileSync("./certs/privkey.pem"),
      cert: fs.readFileSync("./certs/fullchain.pem"),
    },
  },
  output: "server",
  devToolbar: {
    enabled: false
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), auth()],
  adapter: node({
    mode: "standalone",
  }),
})
EOL'
  
  # Actualizar el servicio systemd para usar HTTPS
  sudo bash -c 'cat > /etc/systemd/system/astro-frontend.service << EOL
[Unit]
Description=AgroNet Astro Frontend
After=network.target

[Service]
Type=simple
User=frontend-app
WorkingDirectory=/home/frontend-app/Frontend
Environment="HOST=0.0.0.0"
Environment="PORT=4321"
Environment="SITE_URL=https://www.agronet.are-dev.es"
Environment="PUBLIC_SITE_URL=https://www.agronet.are-dev.es" 
Environment="NODE_OPTIONS=--dns-result-order=ipv4first --no-warnings"
ExecStart=/usr/bin/node ./dist/server/entry.mjs
Restart=always
RestartSec=10
MemoryLimit=512M
CPUQuota=80%
NoNewPrivileges=true
ProtectSystem=full
ProtectHome=read-only
ReadWriteDirectories=/home/frontend-app/Frontend
PrivateTmp=true

[Install]
WantedBy=multi-user.target
EOL'
  
  # Reconstruir la aplicación con la nueva configuración
  cd /home/frontend-app/Frontend
  sudo -u frontend-app npm run build
  
  # Reiniciar el servicio
  sudo systemctl daemon-reload
  sudo systemctl restart astro-frontend
  
  echo "Configuración HTTPS completada. La aplicación debería estar disponible en https://www.agronet.are-dev.es:4321"
else
  echo "Error al obtener el certificado, restaurando el servicio..."
  sudo systemctl start astro-frontend
fi

# Configurar cron para renovación automática
echo "Configurando renovación automática de certificados..."
sudo bash -c 'cat > /etc/cron.d/certbot-renew << EOL
0 0,12 * * * root certbot renew --quiet --post-hook "systemctl restart astro-frontend"
EOL'

echo "Script completado." 