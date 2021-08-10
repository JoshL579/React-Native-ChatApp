import React, { useContext } from 'react';
import { Center, VStack, Button } from 'native-base';
import RoomItem from '../../components/Rooms/RoomItem';
import { deleteToken } from '../../utils/store';
import { AuthContext } from '../../context/AuthContext';


export default function Rooms() {
    const user = useContext(AuthContext);
    const handleLogout = () => {
        deleteToken().then((res) => {
            user.setUserId('')
        })
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