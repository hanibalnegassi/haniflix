import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isReconnecting, setIsReconnecting] = useState(false);
    const [reconnectAttempts, setReconnectAttempts] = useState(0);

    const authReducer = useSelector((state) => state.auth);
    const accessToken = authReducer?.user?.accessToken;

    const MAX_RETRY_ATTEMPTS = 10

    useEffect(() => {


        if (!accessToken) return;

        const createSocket = () => {
            const newSocket = io(import.meta.env.VITE_APP_WEBSOCKETS_URL, {
                withCredentials: true,
                extraHeaders: {
                    token: accessToken,
                },
            });

            setSocket(newSocket);

            // Handle disconnects and reconnects
            newSocket.on("disconnect", () => {
                setIsReconnecting(true);
                setReconnectAttempts((prevAttempts) => prevAttempts + 1);

                const reconnect = () => {
                    if (reconnectAttempts < MAX_RETRY_ATTEMPTS) { // Adjust max attempts as needed
                        setTimeout(() => {
                            createSocket();
                        }, reconnectAttempts * 1000); // Exponential backoff
                    } else {
                        // Handle excessive reconnect attempts (e.g., notify user)
                    }
                };

                reconnect();
            });

            newSocket.on("connect", () => {
                setIsReconnecting(false);
                setReconnectAttempts(0); // Reset attempts on successful connection
            });

            // Cleanup on unmount
            return () => newSocket.disconnect();
        };

        createSocket();
    }, [accessToken]);


    const handleUserLogin = (userId, _socket, socketId) => {
        //  _socket.emit("userLoggedIn", userId, socketId);
    };

    const handleUserLogout = (userId) => {
        // Cleanup socket-related data or subscriptions for this user
        // If needed, emit an event to notify other instances
    };

    const value = {
        socket,
        handleUserLogin,
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};

//  SocketContext;
