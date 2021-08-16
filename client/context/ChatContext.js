import React, { useState, createContext, useEffect, useContext } from "react";
import { getChatHistory, setChatHistory } from "../utils/store";
import { socket } from "../utils/config";
import { addChatHistory } from "../utils/history";
import { AuthContext } from './AuthContext';

export const ChatContext = createContext({
    chats: "",
    setChats: () => { }
});

export const ChatContextProvider = (props) => {
    const user = useContext(AuthContext);
    const [chats, setChats] = useState({});
    const value = { chats, setChats };

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
        socket.on('message', (res, callback) => {
            console.log(res)
            const roomId = res.roomId
            const newMsg = {
                [roomId]: {
                    type: 'msg',
                    text: res.msg,
                    fromSelf: res.uid === user.userId ? true : false
                }
            }
            getChatHistory().then((chats) => {
                const history = addChatHistory(chats, newMsg)
                setChats(history)
                setChatHistory(history)
            })
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
    }, [])

    return (
        <ChatContext.Provider value={value}>
            {props.children}
        </ChatContext.Provider>
    )
}