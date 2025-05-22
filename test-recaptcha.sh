#!/bin/bash
# Script para probar la conectividad y el funcionamiento de reCAPTCHA

# Comprobar conectividad desde el servidor a Google reCAPTCHA
echo "Comprobando conectividad a los servidores de reCAPTCHA..."
curl -s -o /dev/null -w "Conectividad a Google reCAPTCHA: %{http_code}\n" https://www.google.com/recaptcha/api2/
echo ""

# Obtener la configuración actual de reCAPTCHA
echo "Configuración actual de reCAPTCHA:"
sudo grep "RECAPTCHA_" /home/frontend-app/Frontend/.env
echo ""

# Verificar si el servicio Astro está funcionando
echo "Estado del servicio Astro:"
sudo systemctl status astro-frontend --no-pager
echo ""

# Comprobar en qué puerto está escuchando
echo "Puertos en uso:"
sudo ss -tulpn | grep 4321
echo ""

# Probar el endpoint de reCAPTCHA con un token de prueba
echo "Probando endpoint de verificación de reCAPTCHA con un token ficticio..."
TEST_TOKEN="MOCK_TOKEN_FOR_TESTING"
RECAPTCHA_SECRET=$(sudo grep "RECAPTCHA_SECRET" /home/frontend-app/Frontend/.env | cut -d= -f2 | tr -d '"')

RESULT=$(curl -s -X POST https://www.google.com/recaptcha/api/siteverify \
  -d "secret=$RECAPTCHA_SECRET" \
  -d "response=$TEST_TOKEN")
  
echo "Resultado de la verificación (se espera error 'invalid-input-response'):"
echo $RESULT
echo ""

# Comprobar resolución DNS para el dominio
echo "Verificando resolución DNS para www.agronet.are-dev.es:"
host www.agronet.are-dev.es || nslookup www.agronet.are-dev.es || dig www.agronet.are-dev.es || echo "No se pudo resolver el dominio, instala herramientas DNS: sudo dnf install bind-utils"
echo ""

# Mostrar información de diagnóstico
echo "Información de diagnóstico:"
echo "IP pública del servidor: $(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
echo "IP privada del servidor: $(curl -s http://169.254.169.254/latest/meta-data/local-ipv4)"
echo "Protocolo utilizado: $(grep "server: {" /home/frontend-app/Frontend/astro.config.mjs -A 6 | grep "https" || echo "HTTP (sin HTTPS)")"
echo ""

echo "Solución si reCAPTCHA sigue fallando:"
echo "1. Asegúrate de que el dominio 'www.agronet.are-dev.es' esté registrado en la consola de reCAPTCHA"
echo "2. Si usas IP directa, añade también esa IP en la consola de reCAPTCHA"
echo "3. Verifica que estés usando las mismas claves en .env y en los scripts de las páginas"
echo "4. Configura HTTPS como se detalla en el script 'configure-ssl.sh'"
echo "5. Reinicia el servicio: sudo systemctl restart astro-frontend" 