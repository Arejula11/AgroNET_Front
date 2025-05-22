import { useState, useEffect } from 'react';
import socket from '@utils/websockets';

const Message = ({ message, admin = false, user, setReply, token }) => {
    const [isOpen, setIsOpen] = useState(false);

    function handleClick() {
        setReply({ _id: message._id, username: message.author.username, message: message.content })
    }

    function deleteMessage(messageId) {
        socket.emit('deleteMessage', messageId, token , (response) => {
            if (response.error) {
                console.error('Error al eliminar el mensaje:', response.error);
            } 
        });
    }

    function handleEdit(messageId) {
        const messageElement = document.getElementById("message" + messageId);
        if (messageElement) {
            const currentContent = messageElement.textContent;
            const container = document.createElement("div");
            container.style.display = "flex";
            container.style.gap = "0.5rem";
            container.style.alignItems = "center";

            const input = document.createElement("input");
            input.type = "text";
            input.name = "editMessageInput";
            input.value = currentContent;
            input.className = messageElement.className + " focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green";
            input.style.width = "100%";

            const saveBtn = document.createElement("button");
            saveBtn.textContent = "Guardar";
            saveBtn.name = "saveMessage";
            saveBtn.className = "px-3 py-4 h-full bg-primary-green text-white rounded hover:bg-secondary-green";
            saveBtn.onclick = () => {

            socket.emit('editMessage', { messageId, content: input.value, token }, (response) => {
                if (response.error) {
                console.error('Error al editar el mensaje:', response.error);
                messageElement.textContent = currentContent;
                } else {
                messageElement.textContent = input.value;
                }
            });
                messageElement.style.display = "";
                container.replaceWith(messageElement);
            };

            const cancelBtn = document.createElement("button");
            cancelBtn.textContent = "Cancelar";
            cancelBtn.className = "px-3 py-4 bg-gray-300 text-black rounded hover:bg-gray-400";
            cancelBtn.onclick = () => {
            messageElement.style.display = "";
            container.replaceWith(messageElement);
            };

            container.appendChild(input);
            container.appendChild(saveBtn);
            container.appendChild(cancelBtn);

            messageElement.style.display = "none";
            messageElement.parentNode.insertBefore(container, messageElement);
            input.focus();
            input.select();
        }
    }

    const [canEdit, setCanEdit] = useState(true);
    useEffect(() => {

        if (!admin && message.createdAt) {
            const createdAt = new Date(message.createdAt);
            const now = new Date();
            const diffMinutes = (now - createdAt) / (1000 * 60);
            if (diffMinutes > 30) {
                setCanEdit(false);
            }
            const timeout = setTimeout(() => setCanEdit(false), Math.max(0, 30 * 60 * 1000 - (now - createdAt)));
            return () => clearTimeout(timeout);
        }
    }, [])

    return (
        <div className="flex items-start gap-2 w-full justify-end relative">
            {message.author?.profilePicture && <img className="w-8 h-8 rounded-full" src={message.author.profilePicture  ?? "error"} alt={message.author.username + " foto"} />}
            <div className={`flex flex-col w-full leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl  `}>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className=" px-2 text-sm font-semibold text-gray-900 ">{!message.isDeleted ? <a href={user.isAdmin ? "/admin/usuario/"+message.author._id : "/usuario/"+message.author._id} className='hover:underline'>{message.author?.username}</a> : null}</span>
                    <span className="text-sm font-normal text-gray-500 hidden md:block">{!message.isDeleted ? new Date(message.createdAt).toLocaleString("es-ES", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            }): null}</span>
                    <span className="text-sm font-normal text-gray-500  md:hidden">{!message.isDeleted ? new Date(message.createdAt).toLocaleString("es-ES", {
                                day: "2-digit",
                                month: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            }): null}</span>
                </div>
                <p id={"message"+message._id} className="px-2 text-sm font-normal py-2.5 text-gray-900  text-wrap overflow-hidden">{!message.isDeleted ? message.content : "Mensaje eliminado"}</p>
            </div>
            {message.isDeleted === false &&

                <>
                <div className={`z-10 transition-all ease-in-out  ${isOpen ? 'opacity-100 scale-100 absolute right-8' : 'opacity-0 scale-95 hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow-md w-40 `}>
                    <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownMenuIconButton" onClick={() => setIsOpen(!isOpen)}>
                        <li>
                            <button className="block px-4 py-2 w-full text-start hover:bg-gray-100 " onClick={handleClick}>Responder</button>
                        </li>
                        {(admin === true || user._id === message.author._id) && canEdit &&
                            <li>
                                <button name="editMessage" onClick={() => handleEdit(message._id)} className="block px-4 py-2 w-full text-start hover:bg-gray-100">Editar</button>
                            </li>
                        }
                        {(admin === true || user._id === message.author._id) &&
                            <li>
                                <button name="deleteMessage" onClick={() => deleteMessage(message._id)} className="block px-4 py-2 w-full text-start hover:bg-gray-100">Eliminar</button>
                            </li>
                        }

                    </ul>
                </div>
                <button name="dropdown" onClick={() => setIsOpen(!isOpen)} data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none " type="button">
                    <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                        <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg>
                </button>
                </>
            }


        </div >

    );
};

export default Message;