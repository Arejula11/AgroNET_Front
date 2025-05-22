#!/bin/bash
# Script para actualizar las claves de reCAPTCHA en la aplicación

# Variables - Actualiza estas claves con las nuevas de reCAPTCHA
RECAPTCHA_SITE_KEY="6LcVlUMrAAAAACmcKMjwDVRMw_mX1Fh2mSwk6yxd"
RECAPTCHA_SECRET_KEY="6LcVlUMrAAAAAO_GPP2MMy7pFK7fqHf968ZGiQN4"

# Detener el servicio para realizar modificaciones
sudo systemctl stop astro-frontend

# Actualizar archivo .env
echo "Actualizando archivo .env con las claves de reCAPTCHA..."
sudo -u frontend-app sed -i "s/RECAPTCHA_SITE=.*/RECAPTCHA_SITE=\"$RECAPTCHA_SITE_KEY\"/" /home/frontend-app/Frontend/.env
sudo -u frontend-app sed -i "s/RECAPTCHA_SECRET=.*/RECAPTCHA_SECRET=\"$RECAPTCHA_SECRET_KEY\"/" /home/frontend-app/Frontend/.env

# Buscar y reemplazar la clave pública en los archivos con scripts de reCAPTCHA
echo "Buscando archivos con scripts de reCAPTCHA..."
FILES=$(grep -l "recaptcha/api.js" /home/frontend-app/Frontend/src/pages/*.astro)

for FILE in $FILES; do
  echo "Actualizando claves en $FILE"
  # Reemplazar clave vieja 6LecCRwrAAAAALFVCh9DMGWKMBQVAtuaInIm1yJj con la nueva
  sudo -u frontend-app sed -i "s/6LecCRwrAAAAALFVCh9DMGWKMBQVAtuaInIm1yJj/$RECAPTCHA_SITE_KEY/g" "$FILE"
done

# Reconstruir la aplicación
echo "Reconstruyendo la aplicación..."
cd /home/frontend-app/Frontend
sudo -u frontend-app npm run build

# Reiniciar el servicio
echo "Reiniciando el servicio..."
sudo systemctl start astro-frontend

echo "Claves de reCAPTCHA actualizadas correctamente."
echo "Recuerda actualizar tus dominios en la consola de reCAPTCHA:"
echo "https://www.google.com/recaptcha/admin/"
echo "Asegúrate de añadir tanto 'www.agronet.are-dev.es' como el dominio de la IP del servidor."
echo "Script completado." 