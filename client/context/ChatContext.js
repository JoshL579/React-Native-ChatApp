import React, { useState, createContext, useEffect, useContext, useRef } from "react";
import { Platform } from "react-native";
import { getChatHistory, setChatHistory, getUnReadChats, setUnReadChats } from "../utils/store";
import { addChatHistory, addUnReadChat } from "../utils/history";
import { SocketContext } from "./SocketContext";
import { sendLocalNotification } from '../service/notification';
import { AuthContext } from "./AuthContext";
import * as Notifications from 'expo-notifications';
// import { createNavigationContainerRef } from '@react-navigation/native';
import { navigateFromOutside } from "../navigations/navigationRef";

// const navigationRef = createNavigationContainerRef()

// function navigate(name, params) {
//     if (navigationRef.isReady()) {
//         navigationRef.navigate(name, params);
//     }
// }

export const ChatContext = createContext({
    chats: "",
    setChats: () => { },
    unRead: "",
    setUnRead: () => { }
});

export const ChatContextProvider = (props) => {
    const { message, setMessage } = useContext(SocketContext);
    const { userId } = useContext(AuthContext);
    const [chats, setChats] = useState({});
    const [unRead, setUnRead] = useState({});
    const value = { chats, setChats, unRead, setUnRead };
    const responseListener = useRef();

    // update history state when reload
    useEffect(() => {
        getChatHistory().then((res) => {
            console.log(res)
            if (res) {
                return setChats(res);
            }
        })
        responseListener.current = Notifications.addNotificationResponseReceivedListener(res => {
            console.log(res);
            const roomName = res.notification.request.content.data.roomName;
            const roomId = res.notification.request.content.data.roomId;
            console.log(roomName,roomId)
            navigateFromOutside('ChatList', { name: roomName, roomId: roomId })
        });
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
            if (Platform.OS !== 'web' && message.uid !== userId) {
                const notificationMsg = {
                    title: "You've Received a New Message! 📧",
                    body: message.msg.length <= 20 ? message.msg : message.msg.substring(0, 20) + '...',
                    data: { uid: message.uid, roomName: message.roomName, roomId: message.roomId },
                }
                sendLocalNotification(notificationMsg)
            }
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