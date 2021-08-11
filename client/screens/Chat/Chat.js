import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Center, VStack, Button, useTheme, Text } from 'native-base';
import { deleteToken } from '../../utils/store';
import ChatItem from '../../components/Chat/ChatItem';


export default function Chat() {
    const user = useContext(AuthContext);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] =useState(true);
    useEffect(() => {
        //todo: send server join room
        setChats([...chats, {type: 'join', text: `${user.userName} has entered room`}])
        setLoading(false)
    }, [])
    return (
        <VStack flex={1} w="100%">
            {!loading && chats.length > 0 && chats.map((chat, index) => 
                <ChatItem type={chat.type} text={chat.text} key={index} />
            )}
        </VStack>
    )
}