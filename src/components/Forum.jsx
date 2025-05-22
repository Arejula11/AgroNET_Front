import Message from "./Message";
import Pagination from "./Pagination";
import { useEffect, useState } from "react";
import { getInfoForum, sortMessages } from "@utils/getInfoForum";
import MessageCreator from "./MessageCreator";
import socket from "@utils/websockets";


const Forum = ({ id, token, user, admin = false }) => {
    const [page, setPage] = useState(1);
    const [response, setResponse] = useState({ messages: [], totalPages: 0 });
    const [reply, setReply] = useState({});
    const [isScrolling, setIsScrolling] = useState(true); // Estado para controlar el debounce

    let depth = []
    let padding = 0
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getInfoForum({ id: id, page: page, size: 10, token: token, messages: response.messages });
                setResponse(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
        
    }, [page]);
    
    socket.emit('joinForum', response._id, token, async (forum, token) => {
        
        if (response.error) {
            console.error('Error al unirse al foro:', response.error);
        } 
    });
    socket.on('newMessage', (newMessage) => {
        setResponse((prevResponse) => {
            const updatedMessages = [...prevResponse.messages];
            if(!newMessage.parentMessage) {
                return {
                    ...prevResponse,
                    messages: [
                        newMessage,
                        ...updatedMessages.filter(
                            (message) => message._id !== newMessage._id
                        ),
                    ],
                };
            }
            const parentIndex = updatedMessages.findIndex(
            (message) => message._id === newMessage.parentMessage
            );
            if (parentIndex !== -1) {
                updatedMessages.splice(parentIndex + 1, 0, newMessage)

                return {
                    ...prevResponse,
                    messages: updatedMessages.filter(
                        (message, index, self) =>
                            index === self.findIndex((m) => m._id === message._id)
                    )
                    };
            } else {
                return prevResponse
            }


        });
    });
    socket.on('messageDeleted', (messageId) => {
        setResponse((prevResponse) => ({
            ...prevResponse,
            messages: prevResponse.messages.map(
                (message) => {
                    if (message._id === messageId) {
                        message.isDeleted = true;
                    }
                    return message;
                }
            ),
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
        <div className="max-w-screen p-4 mx-auto h-[88%] md:h-[90%] overflow-hidden">
            <h1 className="text-3xl font-extrabold text-center text-primary-green my-4 md:my-8">
                {response.title}
            </h1>
            <div className="flex flex-col md:flex-row w-full justify-between md:mb-6 ">
                <h2 className="text-lg font-sans text-center ">
                    <strong>Descripción:</strong> {response.description}
                </h2>
                <h2 className="text-lg font-sans text-center ">
                    <strong>Fecha de creación:</strong> {new Date(response.createdAt).toLocaleDateString()}
                </h2>
            </div>
            <div className="flex flex-col gap-4 h-[84%] md:h-[82%] overflow-hidden relative">
                <MessageCreator reply={reply} setReply={setReply} user={user} forumId={response._id} token={token} />
                <div className="overflow-y-scroll h-full" onScroll={handleScroll}>
                    {response.messages && response.messages.map((message) => {
                        if (message?.parentMessage) {
                            let i = depth.length - 1;
                            while (depth[i] !== message.parentMessage && i >= 0) {
                                depth.pop();
                                i--;
                            }
                            depth.push(message._id);
                            padding = depth.length;
                        } else {
                            depth = [];
                            padding = 0;
                        }
                        return (
                            <div 
                                key={message._id} 
                                name="message"
                                className={`p-4 bg-white rounded-lg shadow`}
                                style={{
                                    paddingLeft: `${(window.innerWidth < 768 ? Math.min(padding, 5) * 20 : Math.min(padding, 10) * 70)}px`,
                                }}
                            >
                                <Message message={message} admin={admin} user={user} setReply={setReply} token={token} />
                            </div>
                        );
                    })}
                </div>
                <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            </div>
        </div>
    );
};

export default Forum;