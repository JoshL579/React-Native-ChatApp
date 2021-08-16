import React from 'react';
import { Text, Divider, Box, Button } from 'native-base';

export default function RoomItem(props) {
    const { name, roomId, handleEnterRoom } = props;
    return (
        <>
            <Button width="100%" px={4} py={4} 
                bg='blueGray.200'
                colorScheme="blueGrayReverse"
                onPress={()=>handleEnterRoom(name, roomId)}
            >
                <Text fontSize="2xl">
                    {name}
                </Text>
            </Button>
            <Divider bg="blueGray.300" />
        </>
    )
}