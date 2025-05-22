
import {  useEffect, useState } from "react";
import socket from "@utils/websockets";
import { getAdminMessages } from "@/utils/getAdmin";
import Pagination from "./Pagination";


const AdminMessages =  ({token}) => {
    const [response, setResponse] = useState({
        messages: [],
        page: 0,
        pageSize: 0,
        totalMessages: 0,
        totalPages: 0
    });
    const [page, setPage] = useState(1);
    const [isScrolling, setIsScrolling] = useState(true); // Estado para controlar el debounce


    useEffect(() => {
        const fetchMessages = async () => {
            const data = await getAdminMessages({token: token, page: page, size:16})
            
            setResponse((prevResponse) => ({
                ...data,
                messages: [
                    ...prevResponse.messages.filter(
                        (message) => !data.messages.some((newMsg) => newMsg._id === message._id)
                    ),
                    ...data.messages
                ],
            }));
        
        };
        fetchMessages();
    }, [page]);

    socket.emit('joinAdminFeed', token,() => {
        
        if (response.error) {
            console.error('Error al unirse al foro:', response.error);
        }
    });
    socket.on('newMessage', (newMessage) => {
        setResponse((prevResponse) => ({
            ...prevResponse,
            messages: [newMessage,
                ...prevResponse.messages.filter(
                    (message) => message._id !== newMessage._id
                )],
        }));
    });

    socket.on('messageDeleted', (messageId) => {
        setResponse((prevResponse) => ({
            ...prevResponse,
            messages: prevResponse.messages.filter((message) => message._id !== messageId),
        }));
    });

    socket.on('messageEdited', (editedMessage) => {
        setResponse((prevResponse) => ({
        ...prevResponse,
        messages: prevResponse.messages.map((message) =>
            message._id === editedMessage._id ? editedMessage : message
        ),
        }));
    });

    function deleteMessage(messageId) {
        socket.emit('deleteMessage', messageId, token , (response) => {
            if (response.error) {
                console.error('Error al eliminar el mensaje:', response.error);
            }
        });
    }

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollTop + clientHeight >= scrollHeight - 20 && page < response.totalPages && isScrolling ) {

            setIsScrolling(false)
            setPage((prevPage) => prevPage + 1);
            setTimeout(() => {
                setIsScrolling(true)
            }, 500);
        }
    };
    
    return (
        
    <div className="overflow-x-auto p-6 h-[85%]" onScroll={handleScroll}>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden " >
            <tbody className="divide-y divide-gray-200" >
                {response?.messages.map((mensaje) => (
                    <tr className="hover:bg-gray-100 transition grid grid-cols-10" key={mensaje._id} name="message">
                        <td className="px-4 py-4 flex items-center gap-4 col-span-2">
                            {mensaje.author?.profilePicture && <img className="w-10 h-10 rounded-full border border-gray-300 " src={mensaje.author.profilePicture } alt={mensaje.author?.username} />}
                            <div>
                                <a href={"usuario/"+mensaje.author?._id} className="hover:underline"><h5 className="text-sm font-medium text-gray-900 ">{mensaje.author?.username}</h5></a>
                                <span className="text-xs text-gray-500 ">{mensaje.author?.role}</span>
                            </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 col-span-4 overflow-hidden flex items-center">{mensaje.content}</td>
                        <td className="px-4 py-4 text-sm text-gray-500 col-span-1 flex items-center">
                            {new Date(mensaje.createdAt).toLocaleString("es-ES", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 col-span-2 flex items-center">
                            <a href={`foro/${mensaje.forum._id}`} className="hover:underline">
                                {mensaje.forum.title}
                            </a>    
                        </td>
                        <td className="px-4 py-4 flex gap-2 col-span-1 justify-center">
                            {
                                mensaje.isDeleted ? (
                                    <i className="flex items-center text-center ">Eliminado</i>
                                ) : (
                                    <>
                                        <button name="deleteMessage"onClick={() => deleteMessage(mensaje._id)} className="flex items-center gap-1 hover:cursor-pointer bg-red-500 text-white px-3 py-1 rounded-lg shadow-md transition hover:bg-red-600">
                                            Eliminar
                                        </button>
                                        
                                    </>
                                )
                            }
                            
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className="absolute bottom-0 left-0 w-full h-18 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </div>
    );
};

export default AdminMessages;