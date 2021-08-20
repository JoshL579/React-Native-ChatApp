import React, { useState, useEffect, createContext } from "react";
import { socket } from "../utils/config";

export const SocketContext = createContext({
    message: null,
    setMessage: () => { }
});

export const SocketProvider = (props) => {
    const [message, setMessage] = useState(null)
    const value = { message, setMessage }
    useEffect(() => {
        socket.on('message', (res) => {
            setMessage(res)
        })
    }, [])

    return (
        <SocketContext.Provider value={value}>
            {props.children}
        </SocketContext.Provider>
    )
}