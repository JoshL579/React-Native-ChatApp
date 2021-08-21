import React, { useContext, useEffect, useState, useRef } from 'react';
import { Platform } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { VStack, ScrollView, Box, FlatList } from 'native-base';
import ChatItem from '../../components/Chat/ChatItem';
import ChatInput from '../../components/Chat/ChatInput';
import { socket } from '../../utils/config';
import KeyboardSpacer from '../../components/Util/KeyBoardSpacer';

export default function Chat({ route }) {
    const { roomId } = route.params;
    const user = useContext(AuthContext);
    const { chats, unRead, setUnRead } = useContext(ChatContext);
    const [keyBoardOpen, setKeyBoardOpen] = useState(false);

    // send join room to server
    useEffect(() => {
        socket.emit("join", {
            uid: user.userId,
            username: user.userName,
            roomId: roomId,
        });
    }, [])

    // clear notification when use already in room
    useEffect(() => {
        if (!unRead[roomId]) return;
        let newUnRead = unRead;
        newUnRead[roomId].count = 0;
        setUnRead(newUnRead)
    }, [unRead, chats])

    // send msg
    const handleSend = (text) => {
        socket.emit("message", {
            uid: user.userId,
            roomId: roomId,
            msg: text
        });
        // setChats([...chats, { type: 'msg', text: text, fromSelf: true }])
    }

    const renderItem = ({ item }) => (
        <ChatItem
            text={item.text}
            type={item.type}
            uid={item.uid}
        />
    );

    return (
        <Box flex={1}>
            <Box flex={1}>
                <FlatList
                    data={chats[roomId]}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    inverted={true}
                />
            </Box>
            <Box w="100%"
                // flex={0.08}
                h={12}
                border={0} borderTopWidth={1}
                borderColor="blueGray.300"
                bg="blueGray.50"
            >
                <ChatInput handleSend={handleSend} />
            </Box>
            {Platform.OS === 'ios' && <KeyboardSpacer toggle={setKeyBoardOpen} offset={32} />}
        </Box>
    )
}