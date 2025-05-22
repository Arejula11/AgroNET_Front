import socket from "@utils/websockets";
import { useEffect } from "react";


const MessageCreator = ({ reply, setReply, user, forumId, token }) => {
    
    function handleClick() {
        setReply({})
    }



    function createMessage(element) {
        // const messageContent = document.querySelector("messageArea");
        const messageContent = element.value;
        element.value = '';

        if (messageContent.trim() === '') {
            alert('El mensaje no puede estar vacío');
            return;
        }
        const messageData = {
            content: messageContent,
            author: user._id, // Replace with the actual user identifier
            forum: forumId, // Replace with the actual forum identifier
            ...(reply?._id && { parentMessage: reply._id }),
            token: token,
        };

        socket.emit('postMessage', messageData, (response) => {
            if (response.error) {
                console.error('Error al enviar el mensaje:', response.error);
            } else {
                document.querySelector('textarea').value = '';
                setReply({});
            }
        });
    }



    return (
        <div className="my-4 py-4">
            {
            reply && Object.keys(reply).length > 0 && (
                <div className="bg-gray-200 flex items-center justify-between p-2 rounded-t-lg">
                <span className=" text-center text-primary-green">
                    Respondiendo a <strong>{reply.username}: {reply.message}</strong>
                </span>
                <button onClick={handleClick} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                </button>
                </div>
            )
            }

            <div className={`flex  ${reply && Object.keys(reply).length > 0 ? ' rounded-b-md' : 'rounded-md '}`}>
            <div
                name="createMessage"
                className={`bg-primary-green flex items-center justify-center w-8 ${reply && Object.keys(reply).length > 0 ? 'rounded-bl-md' : 'rounded-l-md'}`}
                onClick={(e) => {
                e.stopPropagation();
                createMessage(e.currentTarget.nextSibling);
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
            </div>
            <textarea
                id="messageArea"
                type="text"
                placeholder="Escribe un mensaje..."
                required
                className={`block w-full  bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 outline-secondary-green sm:text-sm/6  ${reply && Object.keys(reply).length > 0 ? 'rounded-br-md' : 'rounded-r-md'}`}
            />
            </div>
        </div>
        );
};

export default MessageCreator;