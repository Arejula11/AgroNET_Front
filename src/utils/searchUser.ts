import { Url } from "@/global/url.js";
import axios from './axios';

// Define el tipo para los datos de inicio de sesión
interface SearchRequest {
    name: string;
    hasAppealed: boolean
    token?: string;
    page?: number;
    size?: number;
}

// Define el tipo para la respuesta de inicio de sesión
interface Response {
    users: {
        _id: string;
        username: string;
        role: string;
        image: string;
    }[],
    page: number;
    pageSize: number;
    totalUsers: number;
    totalPages: number;
};


/**
 * Realiza una búsqueda de usuarios en el servidor.
 *
 * @param {SearchRequest} data - Los datos de búsqueda que contienen el nombre del usuario, página y tamaño.
 * @returns {Promise<Response>} - Una promesa que resuelve con la respuesta de la búsqueda, que incluye los usuarios, página, tamaño de página, total de usuarios y total de páginas.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
async function searchUser(data: SearchRequest): Promise<Response> {
    try {
        const params = new URLSearchParams();


        const usernameParam: string = data.name ? `username=${data.name}&` : "";
        const hasAppealedParam: string = data.hasAppealed ? `hasAppealed=${data.hasAppealed}&` : "";
        const response = await axios.get<Response>(`${Url}users?${usernameParam}${hasAppealedParam}page=${data.page}&size=${data.size}`, {
            headers: {
            Authorization: `Bearer ${data.token}`
            }
        });
        return response.data;
    } catch (error: any) {
        console.error("Error en el search de usuarios:", error.message || error);
        throw error;
    }
}

export { searchUser };
