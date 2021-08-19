import React, { useContext, useEffect, useState } from 'react';
import { Text, Divider, Box, Button, Badge } from 'native-base';
import { ChatContext } from '../../context/ChatContext';

export default function RoomItem(props) {
    const { name, roomId, handleEnterRoom, count } = props;
    const chatHistory = useContext(ChatContext);
    const [unReadcount, setUnReadCount] = useState(0);

    useEffect(() => {
        chatHistory.unRead[roomId] ? setUnReadCount(chatHistory.unRead[roomId].count) : setUnReadCount(0)
    }, [chatHistory, count])
    return (
        <>
            <Button width="100%" px={4} py={4} 
                bg='blueGray.200'
                colorScheme="blueGrayReverse"
                fontSize="2xl"
                onPress={()=>handleEnterRoom(name, roomId)}
                endIcon={
                    unReadcount > 0 &&
                    <Badge bg='blueGray.500' ml={1} rounded="md">
                        <Text color='blueGray.50'>
                            {unReadcount}
                        </Text>
                    </Badge>
                }
            >
                <Text fontSize="2xl">
                    {name}
                </Text>
            </Button>
            <Divider bg="blueGray.300" />
        </>
    )
}