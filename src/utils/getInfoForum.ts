
import { Url } from "@/global/url.js";
import axios from './axios';


interface Request {
    id: string;
    messages: []
    page?: number;
    size?: number;
    token?: string;
}

// Define el tipo de la respuesta de la petición
interface Reply {
    id: number;
    id_user: number;
    name_user: string;
    text: string;
    image: string;
    replies?: Reply[];
}

interface Message {
    _id: string;
    author: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    forumId: string;
    isPinned: boolean;
    upvotes: string[];
    parentMessage?: string;

}

interface Response {
    id: number;
    forumName: string;
    messages: Message[];
    
}

// Función para ordenar los mensajes
const sortMessages = (messages: Message[]): Message[] => {
    const messageMap = new Map<string, Message>();
    const rootMessages: Message[] = [];

    // Crear un mapa de mensajes y separar los mensajes raíz
    messages.forEach((message) => {
        messageMap.set(message._id, message);
        if (!message.parentMessage) {
            rootMessages.push(message);
        }
    });

    // Ordenar los mensajes raíz por `createdAt`
    rootMessages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Función recursiva para agregar respuestas
    const addReplies = (message: Message): Message[] => {
        const replies = messages.filter((m) => m.parentMessage === message._id);
        replies.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        return replies.reduce((acc, reply) => {
            acc.push(reply, ...addReplies(reply));
            return acc;
        }, [] as Message[]);
    };

    // Construir la lista ordenada
    const orderedMessages: Message[] = [];
    rootMessages.forEach((message) => {
        orderedMessages.push(message, ...addReplies(message));
    });

    return orderedMessages;
};

/**
 * Obtiene información sobre un foro específico basado en la solicitud proporcionada.
 *
 * @param {Request} data - Un objeto que contiene el ID del foro a recuperar.
 * @returns {Promise<Response>} - Una promesa que resuelve con la información del foro, incluyendo su ID, nombre y mensajes.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
async function getInfoForum(data: Request): Promise<Response> {
    try {
        const params = (data.page !== undefined && data.size !== undefined)
            ? new URLSearchParams({
                page: data.page.toString(),
                size: data.size.toString()
            })
            : null;
        const headers = data.token ? { Authorization: `Bearer ${data.token}` } : {};
        const response = await axios.get<any>(
            `${Url}forums/${data.id}?page=${data.page}&size=${data.size}`, 
            { headers }
        );
        response.data.messages = [...data.messages, ...response.data.messages].filter((message, index, self) => 
            index === self.findIndex((m) => m._id === message._id)
        );
        

        return response.data;
    } catch (error: any) {
        console.error("Error al obtener el foro:", error.message || error);
        throw error;
    }
    
}

export { getInfoForum, sortMessages };
export type { Response };