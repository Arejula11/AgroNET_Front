import { Url } from "@/global/url.js";
import { UserRole, AutonomousCommunity } from "@/utils/auth.js";
import axios from './axios';

interface Request {
    username: string;
    role: UserRole | string;
    autonomousCommunity: AutonomousCommunity | string;
}

/**
 * Editar un usuario 
 *
 * @param {string} id - Id del usuario
 * @param {Request} data - Datos del usuario a editar
 * @param {any} token - Token de autorización
 * @returns {Promise<any>} - Una promesa que resuelve con la respuesta de la edición del usuario.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
async function editUser( data: Request, token: any): Promise<any> {
    try {
        const response = await axios.put(`${Url}users/profile`,data,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        } );
        return response;
    } catch (error: any) {
        console.error("Error al editar el usuario:", error.message || error);
        throw error;
    }
}


/**
 * Eliminar un usuario
 *
 * @param {string} id - Id del usuario
 * @returns {Promise<any>} - Una promesa que resuelve con la respuesta de la eliminación del usuario.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
async function deleteUser(id: string, token: any): Promise<any> {
    try {
        const response = await axios.delete(`${Url}users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        return response.data;
    } catch (error: any) {
        console.error("Error al eliminar el usuario:", error.message || error);
        throw error;
    }
}

/**
 * Añade una foto de perfil a un usuario
 * @param {File} file - Archivo de la foto de perfil
 * @param {string} token - Token de autorización
 * @returns {Promise<any>} - Una promesa que resuelve con la respuesta de la edición del usuario.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
async function addProfilePicture(file: File, token: string): Promise<any> {
    if (!token) throw new Error("Token no proporcionado");

    try {
        const formData = new FormData();
        formData.append("image", file); // El campo debe llamarse exactamente "image"

        const response = await axios.post(
            `${Url}users/profile-picture`, // Asegúrate de que Url termina en "/api/" si es necesario
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        );

        return response;
    } catch (error: any) {
        console.error("Error al añadir la foto de perfil:", error.response?.data || error.message);
        throw error;
    }
}

/**
 * Edita la contraseña de un usuario
 * @param {string} oldPassword - Contraseña actual
 * @param {string} password - Nueva contraseña
 * @param {any} token - Token de autorización
 * @returns {Promise<any>} - Una promesa que resuelve con la respuesta de la edición del usuario.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
async function editPassword(oldPassword: string, password: string, token: any): Promise<any> {
    try {
        const response = await axios.put(`${Url}users/profile/password`, { currentPassword: oldPassword, newPassword : password }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error: any) {
        console.error("Error al editar la contraseña del usuario:", error.message || error);
        throw error;
    }
}
export { editUser, deleteUser, addProfilePicture, editPassword };
