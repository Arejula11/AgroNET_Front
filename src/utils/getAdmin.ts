
import { Url } from "@/global/url.js";
import axios from './axios';

interface AdminStats {
    totalUsers: number;
    totalPosts: number;
    totalBanned: number;
    totalForums: number;
    usersPerMonth: any[];
    postsPerMonth: any[];
    usersByAutCom: any[];
    usersByRole: any[];
    loginsPerHour: any[];
    loginsPerMonth: any[];
}


/**
 * Obtiene las estadísticas del sistema.
 *
 * @returns {Promise<any>} - Una promesa que resuelve con la información de las estadísitcas.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
async function getAdminStats(data: {token?: string}): Promise<any> {
    try {
        const response = await axios.get(`${Url}stats` , {
            headers: {
            Authorization: `Bearer ${data.token}`
            }
        });
        return response.data;
    } catch (error: any) {
        console.error("Error al registrar el usuario:", error.message || error);
        throw error;
    }
}


interface Message {
    id: string;
    content: string;
    author: string;
    forum: number;
    parentMessage: string;
    upvotes: number;
    isPinned: boolean;
    createdAt: string;
    updatedAt: string;
}

interface Request {
    token?: string;
    page?: number;
    size?: number;
}

interface Response {
    messages: Message[];
    page: number;
    pageSize: number;
    totalMessages: number;
    totalPages: number;
}

/**
 * Obtiene los mensajes del sistema.
 *
 * @returns {Promise<Message>} - Una promesa que resuelve con la información de los mensajes.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
async function getAdminMessages(data: Request): Promise<Response> {
    try {
        const headers = data.token ? { Authorization: `Bearer ${data.token}` } : {};
        const response = await axios.get(`${Url}messages?page=${data.page}&size=${data.size}` , { headers });
        return response.data;
    } catch (error: any) {
        console.error("Error al registrar el usuario:", error.message || error);
        throw error;
    }
}

export { getAdminStats, getAdminMessages };
export type { AdminStats, Message };
