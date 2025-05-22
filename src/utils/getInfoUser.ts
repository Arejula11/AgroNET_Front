import { Url } from "@/global/url.js";
import axios from './axios';
import type { AstroCookies } from "astro";




// Define el tipo de la respuesta de la petición
interface GeometryFeature {
    // Define the structure of a single feature here, or use 'any' if unknown
    [key: string]: any;
}

interface Response {
    geometry: { type: 'FeatureCollection', features: Array<GeometryFeature> },
    _id: string,
    products: any[],
    provinceCode: number,
    provinceName: string,
    municipalityCode: string,
    municipalityName: string,
    parcelUse: string,
    coefRegadio: number,
    altitude: number,
    surface: number,
    createdAt: string,
    updatedAt: string,
    __v: number
}
/**
 * Obtener las parcelas de un usuario 
 *
 * @param {any} token - token de autenticación del usuario
 * @returns {Promise<any[]>} - Una promesa que resuelve con la respuesta de la búsqueda, que incluye el id, nombre, precio e imagen del alimento.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
async function getPlotsUser(token: any): Promise<any> {
    try {
        const response = await axios.get<any>(`${Url}parcels/all`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error: any) {
        console.error("Error al obtener las parcelas:", error.message || error);
        throw error;
    }
}
/**
 * Obtener la información de un usuario
 *
 * @param {string} data - Id del usuario
 * @returns {Promise<any[]>} - Una promesa que resuelve con la respuesta de la búsqueda, que incluye el id, nombre, precio e imagen del alimento.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
async function getInfoUser(data: string, token : any): Promise<any> {
    try {
        const response = await axios.get<any>(`${Url}users/${data}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        );
        return response.data;
    } catch (error: any) {
        console.error("Error al obtener las parcelas:", error.message || error);
        throw error;
    }
}

export { getPlotsUser, getInfoUser };
export type { Response };