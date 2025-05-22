import { Url } from "@/global/url.js";
import axios from './axios';



/**
 * Convertir a un usuario en administrador
 *
 * @param {Object} data - Datos para la solicitud de cambio de rol.
 * @param {string} data.id - ID del usuario a convertir en administrador.
 * @param {string} data.token - Token de autorización del usuario (opcional).
 * @returns {Promise<any>} - Una promesa que se resuelve con la respuesta de la solicitud.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
async function makeAdmin(data: {id: string, token?: string}): Promise<any> {
    try {
        const response = await axios.post(`${Url}users/make-admin`, {id: data.id}, {
            headers: {
            Authorization: `Bearer ${data.token}`
            }
        });
        return response.data;
    } catch (error: any) {
        console.error("Error al hacer administrador:", error.message || error);
        throw error;
    }
}

export default makeAdmin;