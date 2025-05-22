import { Url } from "@/global/url.js";
import axios from 'axios';

interface Request {
    id:string 
    title: string;
    description: string;
    token?: string;
}

/**
 * Actualizar un foro
 *
 * @param {string} id - ID del foro a actualizar.
 * @param {Request} data - Datos necesarios para actualizar el foro.
 * @returns {Promise<any>} - Una promesa que resuelve con la respuesta de la actualización del foro.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
async function updateForum(data: Request): Promise<any> {
    try {
        const headers = data.token ? { Authorization: `Bearer ${data.token}` } : {};
        const response = await axios.put(`${Url}forums/${data.id}`, {title: data.title, description: data.description}, {headers});
        return response.data;
    } catch (error: any) {
        console.error("Error al actualizar el foro:", error.message || error);
        throw error;
    }
}

export { updateForum };
