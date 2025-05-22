import { Url } from "@/global/url.js";
import axios from 'axios';

interface Request {
    title: string;
    description: string;
    token?: string;
}

/**
 * Crear un foro
 *
 * @param {Request} data - Datos necesarios para crear el foro.
 * @returns {Promise<any>} - Una promesa que resuelve con la respuesta de la creación del foro.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
async function createForum(data: Request): Promise<any> {
    try {
        const headers = data.token ? { Authorization: `Bearer ${data.token}` } : {};
        const response = await axios.post(`${Url}forums`, data, {headers});
        return response.data;
    } catch (error: any) {
        console.error("Error al crear el foro:", error.message || error);
        throw error;
    }
}

export { createForum };
