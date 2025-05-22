import { Url } from "@/global/url.js";
import axios from './axios';


// Define el tipo para los datos de inicio de sesión
interface LoginData {
    usernameOrEmail: string;
    password: string;
}

// Define el tipo para la respuesta de inicio de sesión
interface LoginResponse {
    token: string;
    user: {
        _id: string;
        name: string;
        email: string;
        isAdmin: boolean;
        role: string;
        autonomousComunity: string;
        isBlocked: boolean;
        profilePicture: string;
    };
}

/**
 * Inicia sesión de un usuario enviando una solicitud POST al servidor.
 * 
 * @param {LoginData} data - Los datos del usuario para iniciar sesión.
 * @returns {Promise<LoginResponse>} - Una promesa que se resuelve con el objeto de respuesta de la solicitud.
 * @throws {Error} - Si la solicitud de inicio de sesión no se puede completar correctamente.
 */
async function loginUser(data: LoginData): Promise<LoginResponse> {
    try {
        console.log(Url+"auth/login");
        const response = await axios.post<LoginResponse>(`${Url}auth/login`, data);
        return response.data;
    } catch (error: any) {
        console.error("Error en el login del usuario:", error.message || error);
        throw error;
    }
}
enum AutonomousCommunity {
    ANDALUCIA = 'Andalucía',
    ARAGON = 'Aragón',
    ASTURIAS = 'Principado de Asturias',
    BALEARES = 'Illes Balears',
    CANARIAS = 'Canarias',
    CANTABRIA = 'Cantabria',
    CASTILLA_LEON = 'Castilla y León',
    CASTILLA_LA_MANCHA = 'Castilla-La Mancha',
    CATALUGNA = 'Cataluña',
    VALENCIA = 'Comunitat Valenciana',
    EXTREMADURA = 'Extremadura',
    GALICIA = 'Galicia',
    MADRID = 'Comunidad de Madrid',
    MURCIA = 'Región de Murcia',
    NAVARRA = 'Comunidad Foral de Navarra',
    PAIS_VASCO = 'País Vasco',
    RIOJA = 'La Rioja',
    CEUTA = 'Ciudad Autónoma de Ceuta',
    MELILLA = 'Ciudad Autónoma de Melilla',
}

enum UserRole {
    SMALL_FARMER = 'Agricultor pequeño',
    MEDIUM_FARMER = 'Agricultor mediano',
    BIG_FARMER = 'Agricultor grande',
    COOP_PRESIDENT = 'Presidente de cooperativa',
    WHOLESALER = 'Mayorista',
    EXPERT = 'Experto',
}

interface RegisterData {
    username: string;
    email: string;
    password: string;
    role: UserRole | string;
    autonomousCommunity: AutonomousCommunity | string;
}
interface RegisterDataProvider {
    tokenProvider: any
    userData: {
        username: string;
        email: string;
        role: UserRole | string;
        autonomousCommunity: AutonomousCommunity | string;
    }
}

/**
 * Registra un nuevo usuario enviando una solicitud POST al servidor.
 * 
 * @param {RegisterData} data - Los datos del usuario a registrar.
 * @returns {Promise<any>} - Una promesa que se resuelve con el objeto de respuesta de la solicitud.
 * @throws {Error} - Si la solicitud de registro no se puede completar correctamente.
 */
async function registerUser(data: RegisterData): Promise<any> {
    try {
        const response = await axios.post(`${Url}auth/signup`, data);
        return response;
    } catch (error: any) {
        console.error("Error al registrar el usuario:", error.message || error);
        throw error;
    }
}
/**
 * Registra un nuevo usuario enviando una solicitud POST al servidor cuando se ha iniciado sesión desde un provider
 * 
 * @param {RegisterData} data - Los datos del usuario a registrar.
 * @returns {Promise<any>} - Una promesa que se resuelve con el objeto de respuesta de la solicitud.
 * @throws {Error} - Si la solicitud de registro no se puede completar correctamente.
 */
async function registerUserProvider(data: RegisterDataProvider, provider: string): Promise<any> {
    try {
        const response = await axios.post(`${Url}/auth/${provider}/register`, data);
        return response;
    } catch (error: any) {
        console.error("Error al registrar el usuario:", error.message || error);
        throw error;
    }
}

export { loginUser, registerUser, UserRole, AutonomousCommunity, registerUserProvider };