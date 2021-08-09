import React from 'react';
import { Center, VStack, Button } from 'native-base';
import RoomItem from '../../components/Rooms/RoomItem';
import { deleteToken } from '../../utils/store';

export default function Rooms() {
    const handleLogout = () => {
        deleteToken().then((res) => {
            console.log(res)
        })

        // console.log(deleteToken())
    }
    return (
        <VStack flex={1} w="100%">
            <Center>
                <RoomItem />
                <RoomItem />
                <RoomItem />
                <RoomItem />
            </Center>
            <Button onPress={handleLogout}>LogOut</Button>
        </VStack>
    )
}