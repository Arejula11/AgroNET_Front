import { Url } from "@/global/url.js";
import axios from './axios';



/**
 * Desbloquear a un usuario
 *
 * @param {Object} data - Datos para la solicitud de desbloqueo.
 * @param {string} data.id - ID del usuario a desbloquear.
 * @param {string} data.token - Token de autorización del usuario (opcional).
 * @returns {Promise<any>} - Una promesa que se resuelve con la respuesta de la solicitud de desbloqueo.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
async function unblock(data: {id: string, token?: string}): Promise<any> {
    try {
        const response = await axios.post(`${Url}users/unblock`, {id: data.id}, {
            headers: {
            Authorization: `Bearer ${data.token}`
            }
        });
        return response.data;
    } catch (error: any) {
        console.error("Error al desbloquear:", error.message || error);
        throw error;
    }
}


/**
 * Bloquear a un usuario
 *
 * @param {Object} data - Datos para la solicitud de bloqueo.
 * @param {string} data.id - ID del usuario a bloquear.
 * @param {string} [data.token] - Token de autorización del usuario (opcional).
 * @returns {Promise<any>} - Una promesa que se resuelve con la respuesta de la solicitud de bloqueo.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
async function block(data: {id: string, reason:string, token?: string}): Promise<any> {
    try {
        const response = await axios.post(`${Url}users/block`, {id: data.id, reason: data.reason}, {
            headers: {
            Authorization: `Bearer ${data.token}`
            }
        });
        return response.data;
    } catch (error: any) {
        console.error("Error al bloquear:", error.message || error);
        throw error;
    }
}

export { unblock, block };
