import { Url } from "@/global/url.js";
import axios from './axios';


// Define el tipo para los datos de inicio de sesión
interface Request {
    id: string;
    token?: string;
}

// Define el tipo para la respuesta de inicio de sesión
interface Response {
    data: {
        id: string;
        name: string;
        sector: string;
        image: string;
        prices: [Date, number][];
        priceChange: {
            one_month: number;
            six_months: number;
            one_year: number;
            ytd: number;
            all: number;
        }}
};
/**
 * Realiza una búsqueda de alimentos en el servidor.
 *
 * @param {Request} data - Los datos de búsqueda que contienen el nombre del alimento.
 * @returns {Promise<Response>} - Una promesa que resuelve con la respuesta de la búsqueda, que incluye el id, nombre, precio e imagen del alimento.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
async function getInfoProduct(data: Request): Promise<Response> {
    try {
        const response = await axios.get<Response>(`${Url}products/${data.id}`, {
            headers: {
            Authorization: `Bearer ${data.token}`
            }
        });
        return response.data;
    } catch (error: any) {
        console.error("Error al obtener información del alimento:", error.message || error);
        throw error;
    }
}

export { getInfoProduct };
export type { Response, Request };