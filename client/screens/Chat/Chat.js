import React, { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { VStack, ScrollView, Box } from 'native-base';
import ChatItem from '../../components/Chat/ChatItem';
import ChatInput from '../../components/Chat/ChatInput';
import { socket } from '../../utils/config';

export default function Chat({ route }) {
    const { roomId } = route.params;
    const user = useContext(AuthContext);
    const chatHistory = useContext(ChatContext);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollEl = useRef(null);

    const scrollToBottom = () => {
        scrollEl.current.scrollIntoView({ behavior: 'smooth'})
    }

    useEffect(() => {
        scrollToBottom()
    }, [scrollEl, loading, chatHistory])

    // send join room to server
    useEffect(() => {                
        socket.emit("join", {
            uid: user.userId,
            username: user.userName,
            roomId: roomId,
        }, () => {
            setLoading(false)
        });
    }, [])

    // update join msg when receive, which will not store in storage
    // useEffect(() => {
    //     let isMounted = true;

    //     socket.on('join', (res, callback) => {
    //         if (isMounted) setChats([...chats, { type: 'join', text: `${res.name} has entered room` }])
    //     })
    //     socket.on('leave', (res, callback) => {
    //         if (isMounted) setChats([...chats, { type: 'join', text: `${res.name} has left room` }])
    //     })

    //     return () => { isMounted = false };
    // }, [])

    const handleSend = (text) => {
        socket.emit("message", { 
            uid: user.userId, 
            roomId: roomId,
            msg: text 
        });        
        // setChats([...chats, { type: 'msg', text: text, fromSelf: true }])
    }

    return (
        <>
            <ScrollView bottom={0} w="100%" bg="blueGray.100" inverted>
                <VStack flex={1} w="100%" id="VStack">
                    {!loading && chatHistory.chats[roomId] && chatHistory.chats[roomId].length > 0 && chatHistory.chats[roomId].map((chat, index) =>
                        <ChatItem type={chat.type}
                            text={chat.text}
                            fromSelf={chat.fromSelf}
                            key={index}
                        />
                    )}
                    <Box ref={scrollEl} />
                </VStack>                
            </ScrollView>
            
            <Box w="100%"
                border={0} borderTopWidth={1}
                borderColor="blueGray.300"
                bg="blueGray.50"
            >
                <ChatInput handleSend={handleSend} />
            </Box>
        </>
    )
}