import React, { useState, createContext, useEffect, useContext } from "react";
import { getChatHistory, setChatHistory, getUnReadChats, setUnReadChats } from "../utils/store";
import { addChatHistory, addUnReadChat } from "../utils/history";
import { SocketContext } from "./SocketContext";

export const ChatContext = createContext({
    chats: "",
    setChats: () => { },
    unRead: "",
    setUnRead: () => { }
});

export const ChatContextProvider = (props) => {
    const { message, setMessage } = useContext(SocketContext);
    const [chats, setChats] = useState({});
    const [unRead, setUnRead] = useState({});
    const value = { chats, setChats, unRead, setUnRead };

    // update history state when reload
    useEffect(() => {
        getChatHistory().then((res) => {
            console.log(res)
            if (res) {
                return setChats(res);
            }
        })
    }, [])

    // update msg when receive
    useEffect(() => {
        if (!message) return
        const roomId = message.roomId
        const newMsg = {
            [roomId]: {
                type: 'msg',
                text: message.msg,
                uid: message.uid
            }
        }

        getChatHistory().then((chats) => {
            const history = addChatHistory(chats, newMsg)
            setChats(history)
            setChatHistory(history)
            const newUnRead = addUnReadChat(message, unRead, roomId)
            setUnRead(newUnRead)
            setMessage(null)
            //todo add unread into storage
            //todo load unread when first open
        })

        // join & leave room msg
        // socket.on('join', (res, callback) => {
        //     const newMsg = {
        //         [res.roomId]: { 
        //             type: 'join', 
        //             text: `${res.name} has entered room` }
        //     }
        //     getChatHistory().then((chats) => {
        //         const history = addChatHistory(chats, newMsg)
        //         setChats(history)
        //         setChatHistory(history)
        //     })
        // })
        // socket.on('leave', (res, callback) => {
        //     const newMsg = {
        //         [res.roomId]: { 
        //             type: 'join', 
        //             text: `${res.name} has entered room` }
        //     }
        //     getChatHistory().then((chats) => {
        //         const history = addChatHistory(chats, newMsg)
        //         setChats(history)
        //         setChatHistory(history)
        //     })
        // })
    }, [message])

    return (
        <ChatContext.Provider value={value}>
            {props.children}
        </ChatContext.Provider>
    )
}