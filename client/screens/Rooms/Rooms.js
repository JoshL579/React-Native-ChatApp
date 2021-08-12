import React, { useContext, useEffect, useState } from 'react';
import { Center, VStack } from 'native-base';
import RoomItem from '../../components/Rooms/RoomItem';
import { AuthContext } from '../../context/AuthContext';
import { getRooms } from '../../api/rooms';


export default function Rooms(props) {
    const { navigation } = props;
    const user = useContext(AuthContext);
    const [rooms, setRooms] = useState([])
    useEffect(() => {
        getRooms().then((res) => {
            setRooms(res.rooms)
        }).catch((err) => {
            //todo: add alert
            console.log(err)
        })
    }, [])
    const handleEnterRoom = (name) => {
        console.log(navigation.getParent())
        navigation.navigate('ChatList', { name: name });
    }
    return (
        <VStack flex={1} w="100%">
            <Center>
                {rooms.length > 0 && rooms.map((rooms) =>
                    <RoomItem name={rooms.name} key={rooms.id} handleEnterRoom={handleEnterRoom} />
                )}
            </Center>
        </VStack>
    )
}