import axios from 'axios';
import { Url } from '@/global/url';

// Configuración para el logging
const DEBUG = true;

// Interceptor para solicitudes
axios.interceptors.request.use(
  (config) => {
    if (DEBUG) {
      console.log(`🚀 REQUEST [${config.method?.toUpperCase()}] ${config.url}`);
      console.log('Headers:', config.headers);
      if (config.data) {
        console.log('Payload:', config.data);
      }
      console.log('Timestamp:', new Date().toISOString());
    }
    return config;
  },
  (error) => {
    console.error('❌ Error en la solicitud al backend:', error.message);
    return Promise.reject(error);
  }
);

// Interceptor para respuestas
axios.interceptors.response.use(
  (response) => {
    if (DEBUG) {
      console.log(`✅ RESPONSE [${response.status}] desde ${response.config.url}`);
      console.log('Datos recibidos:', response.data);
      console.log('Tiempo de respuesta:', Date.now() - new Date(response.config.headers.timestamp || Date.now()).getTime(), 'ms');
    }
    return response;
  },
  (error) => {
    console.error(`❌ ERROR [${error.response?.status || 'NETWORK'}] en la petición a: ${error.config?.url}`);
    console.error('Mensaje de error:', error.response?.data || error.message);
    
    const msg = error?.response?.data;
    if (error.response?.status === 403 && typeof msg === 'string' && msg.includes("Your account is blocked")) {
      console.error("Error: Tu cuenta está bloqueada");
      window.location.href = '/logout';
    }

    return Promise.reject(error);
  }
);

export default axios;
