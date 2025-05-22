import { Url } from "@/global/url.js";
import axios from 'axios';

interface Request {
    id: string;
    token?: string;
}

/**
 * Eliminar un foro
 *
 * @param {Request} data - Datos necesarios para eliminar el foro.
 * @returns {Promise<any>} - Una promesa que resuelve con la respuesta de la eliminación del foro.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
async function deleteForum(data: Request): Promise<any> {
    try {
        const headers = data.token ? { Authorization: `Bearer ${data.token}` } : {};
        const response = await axios.delete(`${Url}forums/${data.id}`, {headers});
        return response.data;
    } catch (error: any) {
        console.error("Error al eliminar el foro:", error.message || error);
        throw error;
    }
}

export { deleteForum };
