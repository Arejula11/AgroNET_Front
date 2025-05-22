import { io, Socket } from "socket.io-client";
import { Url } from "@/global/url";

// Configuración para el logging
const DEBUG = true;

// Construir la URL para WebSockets
const wsUrl = Url.replace("/api", "");
console.log(`🔌 Intentando conectar a WebSocket: ${wsUrl}`);

// Conecta al servidor WebSocket
const socket: Socket = io(wsUrl, {
    transports: ["websocket"], // Asegura que se use WebSocket
    reconnection: true,        // Habilita la reconexión automática
    reconnectionAttempts: 5,   // Número de intentos de reconexión
    reconnectionDelay: 1000,   // Tiempo entre intentos de reconexión
});

// Eventos de logging para WebSockets
if (DEBUG) {
    // Evento de conexión
    socket.on("connect", () => {
        console.log(`✅ WebSocket conectado con ID: ${socket.id}`);
    });

    // Evento de desconexión
    socket.on("disconnect", (reason: string) => {
        console.log(`❌ WebSocket desconectado. Razón: ${reason}`);
    });

    // Evento de error
    socket.on("connect_error", (error: Error) => {
        console.error(`❌ Error de conexión WebSocket: ${error.message}`);
    });

    // Evento de reconexión
    socket.on("reconnect", (attemptNumber: number) => {
        console.log(`🔄 WebSocket reconectado después de ${attemptNumber} intentos`);
    });

    // Evento de intento de reconexión
    socket.on("reconnect_attempt", (attemptNumber: number) => {
        console.log(`🔄 Intento de reconexión #${attemptNumber}`);
    });

    // Evento de error de reconexión
    socket.on("reconnect_error", (error: Error) => {
        console.error(`❌ Error al intentar reconectar WebSocket: ${error.message}`);
    });

    // Evento de fallo en la reconexión
    socket.on("reconnect_failed", () => {
        console.error(`❌ Falló la reconexión WebSocket después de ${socket.io.opts.reconnectionAttempts} intentos`);
    });
}

export default socket;