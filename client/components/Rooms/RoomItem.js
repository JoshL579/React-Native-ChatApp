import React, { useContext } from 'react';
import { Text, Divider, Box, Button, Badge } from 'native-base';
import { ChatContext } from '../../context/ChatContext';

export default function RoomItem(props) {
    const { name, roomId, handleEnterRoom } = props;
    const { unRead } = useContext(ChatContext);

    return (
        <>
            <Button width="100%" px={4} py={4}
                bg='blueGray.200'
                colorScheme="blueGrayReverse"
                fontSize="2xl"
                onPress={() => handleEnterRoom(name, roomId)}
                endIcon={
                    unRead[roomId] && unRead[roomId].count > 0 &&
                    <Badge bg='blueGray.500' ml={1} rounded="md">
                        <Text color='blueGray.50'>
                            {unRead[roomId].count}
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