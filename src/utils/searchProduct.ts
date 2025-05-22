import { Url } from "@/global/url.js";
import axios from './axios';

// Define el tipo para los datos de inicio de sesión
interface SearchRequest {
    name: string;
    token?: string;
    page?: number;
    size?: number;
}

// Define el tipo para la respuesta de inicio de sesión
interface SearchResponse {
    products: {
        id: string;
        name: string;
        sector: string;
        lastPrice: number;
        image: string;
    }[],
    page: number;
    pageSize: number;
    totalProducts: number;
    totalPages: number;
};


/**
 * Realiza una búsqueda de alimentos en el servidor.
 *
 * @param {SearchRequest} data - Los datos de búsqueda que contienen el nombre del alimento.
 * @returns {Promise<SearchResponse[]>} - Una promesa que resuelve con la respuesta de la búsqueda, que incluye el id, nombre, precio e imagen del alimento.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
async function searchProduct(data: SearchRequest): Promise<SearchResponse[]> {
    try {
        const params = new URLSearchParams();

            params.append("name", data.name);
            params.append("page", data.page?.toString() || "");
            params.append("size", data.size?.toString() || "");
        const response = await axios.get<SearchResponse[]>(`${Url}products?${params.toString()}`, {
            headers: {
            Authorization: `Bearer ${data.token}`
            }
        });

        return response.data;
    } catch (error: any) {
        console.error("Error en el search de alimentos:", error.message || error);
        throw error;
    }
}

export { searchProduct };
export type { SearchResponse, SearchRequest };