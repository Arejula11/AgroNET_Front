
import { Url } from "@/global/url.js";
import axios from './axios';

type Geometry = {
    type: "Polygon";
    coordinates: number[][][];
};

type Properties = {
    nivel: string;
    fenomeno: string;
    areaDesc: string;
    descripcion: string;
    probabilidad: string;
    onset: string;
    expires: string;
    effective: string;
    severity: string;
    certainty: string;
    urgency: string;
};

type Feature = {
    type: "Feature";
    geometry: Geometry;
    properties: Properties;
};

interface ResponseAlerts {
    type: "FeatureCollection";
    features: Feature[];
}

/**
 * Obtiene las alertas climaticas que se han obtenido en el sistema.
 * @param {any} token - El token de autorización para la solicitud.
 * @returns {Promise<any>} - Una promesa que resuelve con la información de las alertas.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
async function getAlerts(token : any): Promise<any> {
    try {
        const response = await axios.get(`${Url}alerts/weather` , {
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error: any) {
        console.error("Error al obtener las alertas:", error.message || error);
        throw error;
    }
}


export { getAlerts };
export type { ResponseAlerts, Feature, Properties, Geometry };

