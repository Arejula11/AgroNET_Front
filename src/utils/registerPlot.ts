import { Url } from "@/global/url.js";
import axios from 'axios';
import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson"

// Define el tipo de Request para la búsqueda de parcela
interface Request {
    crop : string;
    location: {
        lat: number;
        lng: number;
    },
    products: string[];
}

// Define el tipo de parcel en la respuesta
interface GeometryFeature {
     // Define the structure of a single feature here, or use 'any' if unknown
     [key: string]: any;
 }

interface Parcel {
    geometry: FeatureCollection,
    products: string[],
    crop: string,
    provinceCode: number,
    provinceName: string,
    municipalityCode: string,
    municipalityName: string,
    parcelUse: string,
    coefRegadio: number,
    altitude: number,
    surface: number,
    _id: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}

// Define el tipo para la respuesta con la información de la parcela
interface Response {
    parcel: Parcel;
   message: string;
};

/**
 * Realiza una búsqueda de parcela en el servidor.
 *
 * @param {Request} data - Los datos de búsqueda que contienen las coordenadas de la parcela.
 * @param {any} token - El token de autenticación del usuario.
 * @returns {Promise<Response[]>} - Una promesa que resuelve con la información de la parcela.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
async function registerPlot(data: Request, token : any): Promise<{response: Response, status: any}> {
    try {
        const response = await axios.post<Response>(`${Url}parcels`,data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
         return { response: response.data, status: response.status };
    } catch (error: any) {
        console.error("Error al obtener información de la parcela:", error.message || error);
        throw error;
    }
}

export { registerPlot };
