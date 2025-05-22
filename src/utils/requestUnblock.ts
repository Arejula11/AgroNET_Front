import { Url } from "@/global/url.js";
import axios from './axios';



/**
 * Solicitar el desbloqueo de un usuario
 *
 * @param {Object} data - Datos para la solicitud de desbloqueo.
 * @param {string} data.appeal - Apelación del usuario para solicitar el desbloqueo.
 * @param {string} [data.token] - Token de autorización del usuario (opcional).
 * @returns {Promise<any>} - Una promesa que resuelve con la respuesta de la solicitud de desbloqueo.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
async function requestUnblock(data: {appeal: string, token?: string}): Promise<any> {
    try {
        const response = await axios.post(`${Url}users/request-unblock`, {appeal: data.appeal}, {
            headers: {
            Authorization: `Bearer ${data.token}`
            }
        });
        return response.data;
    } catch (error: any) {
        console.error("Error al solicitar desbloqueo:", error.message || error);
        throw error;
    }
}

export { requestUnblock };
