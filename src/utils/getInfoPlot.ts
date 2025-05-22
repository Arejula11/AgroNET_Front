import { Url } from "@/global/url.js";
import axios from './axios';
import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson"

// Define el tipo de Request para la búsqueda de parcela
interface Request {
    lat: string;
    lng: string;
}

// Define el tipo de parcel en la respuesta
interface GeometryFeature {
     // Define the structure of a single feature here, or use 'any' if unknown
     [key: string]: any;
 }

interface Parcel {
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
     __v: number,
     crop: string,
}

// Define el tipo de weather en la respuesta
interface Weather {
    main: {
        temperature: number,
        windChillFactor: number,
        relativeHumidity: number,
        skyState: string
    },
    wind: {
        speed: number,
        gust: number,
        direction: number
    },
    precipitation: {
        rain: number,
        rainChance: number,
        snow: number,
        snowChance: number,
        stormChance: number
    },
    date: string,
    hour: number,
    distance: number,
    municipality: string
}

interface Owner {
    _id: string,
    username: string,
    email: string,
    profilePicture: string,
    role: string,
    autonomousCommunity: string,
    isAdmin: boolean,
    createdAt: string,
    isBlocked: boolean,
    parcels: string[],
    loginHistory: any[],
    __v: number
}

// Define el tipo para la respuesta con la información de la parcela
interface Response {
    parcel: Parcel;
    weather: Weather | string;
    owner: Owner | null 
};

/**
 * Realiza una búsqueda de parcela en el servidor.
 *
 * @param {Request} data - Los datos de búsqueda que contienen las coordenadas de la parcela.
 * @param {any} token - El token de autenticación del usuario.
 * @returns {Promise<Response[]>} - Una promesa que resuelve con la información de la parcela.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
async function getInfoPlot(data: Request, token : any): Promise<Response> {
    try {
        const response = await axios.get<Response>(`${Url}parcels?lng=${data.lng}&lat=${data.lat}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
         return response.data;
    } catch (error: any) {
        console.error("Error al obtener información de la parcela:", error.message || error);
        throw error;
    }
}

export { getInfoPlot };
export type { Request, Response, Parcel, Weather, Owner, GeometryFeature };
