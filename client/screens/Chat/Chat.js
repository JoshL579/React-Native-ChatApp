import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Center, VStack, Button, useTheme, Text, ScrollView, Flex, Box } from 'native-base';
import { deleteToken } from '../../utils/store';
import ChatItem from '../../components/Chat/ChatItem';
import ChatInput from '../../components/Chat/ChatInput';
import { socket } from '../../utils/config';

export default function Chat() {
    const user = useContext(AuthContext);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        //todo: send server join room
        socket.emit("join", {
            uid: user.userId,
            username: user.userName,
            roomId: user.currentRoom,
        }, () => {
            setLoading(false)
        });
    }, [])
    const handleSend = (text) => {
        socket.emit("message", { 
            uid: user.userId, 
            msg: text 
        });
        // setChats([...chats, { type: 'msg', text: text, fromSelf: true }])
    }
    socket.on('join', (res, callback) => {
        setChats([...chats, { type: 'join', text: `${res.name} has entered room` }])
    })
    socket.on('message', (res, callback) => {
        setChats([...chats, { 
            type: 'msg', 
            text: res.msg, 
            fromSelf: res.uid === user.userId ? true : false
        }])
    })
    return (
        <>
            <ScrollView bottom={0} w="100%" bg="blueGray.100">
                <VStack flex={1} w="100%">
                    {!loading && chats.length > 0 && chats.map((chat, index) =>
                        <ChatItem type={chat.type}
                            text={chat.text}
                            fromSelf={chat.fromSelf}
                            key={index}
                        />
                    )}
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