import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Center, VStack, Button, useTheme, Text, ScrollView, Flex, Box } from 'native-base';
import { deleteToken } from '../../utils/store';
import ChatItem from '../../components/Chat/ChatItem';
import ChatInput from '../../components/Chat/ChatInput';


export default function Chat() {
    const user = useContext(AuthContext);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        //todo: send server join room
        setChats([...chats, { type: 'join', text: `${user.userName} has entered room` }])
        setLoading(false)
    }, [])
    return (
        <>
            <ScrollView bottom={0} w="100%" bg="blueGray.100">
                <VStack flex={1} w="100%">
                    {!loading && chats.length > 0 && chats.map((chat, index) =>
                        <ChatItem type={chat.type} text={chat.text} key={index} />
                    )}
                </VStack>
            </ScrollView>
            <Box w="100%"
                border={0} borderTopWidth={1}
                borderColor="blueGray.300"
                bg="blueGray.50"
            >
                <ChatInput />
            </Box>
        </>
    )
}