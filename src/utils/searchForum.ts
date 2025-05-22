import { Url } from "@/global/url.js";
import axios from './axios';

// Define el tipo para los datos de inicio de sesión
interface Request {
    name: string;
    page?: number;
    size?: number;
    token?: string;
}

// Define el tipo para la respuesta de inicio de sesión
interface Response {
    data: {

        forums: {
            id: string;
            name: string;
        }[],
        page: number,
        pageSize: number,
        totalForums: number,
        totalPages: number
    }
};

const PAGE = 1
const SIZE = 20

/**
 * Realiza una búsqueda en el foro en el servidor.
 *
 * @param {Request} data - Los datos de búsqueda que contienen el nombre del foro.
 * @returns {Promise<Response>} - Una promesa que resuelve con la respuesta de la búsqueda, que incluye los elementos y el número de páginas.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
async function searchForum(data: Request): Promise<Response> {
    try {
        const params = new URLSearchParams({
            title: data.name,
            page: data.page?.toString() || PAGE.toString(),
            size: data.size?.toString() || SIZE.toString()
        });
        const headers = data.token ? { Authorization: `Bearer ${data.token}` } : {};
        const response = await axios.get<Response>(`${Url}forums?${params.toString()}`, { headers });
        return response.data;
    } catch (error: any) {
        console.error("Error en el search de foros:", error.message || error);
        throw error;
    }
}

export { searchForum };
export type { Response, Request };