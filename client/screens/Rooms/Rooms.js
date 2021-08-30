import React, { useContext, useEffect, useState } from 'react';
import { Center, VStack } from 'native-base';
import RoomItem from '../../components/Rooms/RoomItem';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { getRooms } from '../../api/rooms';
import { socket } from '../../utils/config';
import { clearNotification } from '../../utils/history';


export default function Rooms(props) {
    const { navigation } = props;
    // const user = useContext(AuthContext);
    const { userId, userName, rooms, setRooms, setCurrentRoom } = useContext(AuthContext);
    const chatHistory = useContext(ChatContext);
    // const [rooms, setRooms] = useState([]);

    useEffect(() => {
        getRooms().then((res) => {
            setRooms(res.rooms)
        }).catch((err) => {
            //todo: add alert
            console.log(err)
        })
    }, [])

    useEffect(() => {
        socket.emit("join", {
            uid: userId,
            username: userName,
            roomId: '1001',
        });
    }, [])

    const handleEnterRoom = (name, roomId) => {
        setCurrentRoom({
            id: roomId,
            name: name
        })
        const newUnRead = clearNotification(chatHistory.unRead, roomId)
        if (newUnRead) {
            chatHistory.setUnRead(newUnRead)
        }
        navigation.navigate('ChatList', { name: name, roomId: roomId });
    }

    return (
        <VStack flex={1} w="100%">
            {rooms.length > 0 && rooms.map((room) =>
                <RoomItem
                    name={room.name}
                    roomId={room.id}
                    key={room.id}
                    handleEnterRoom={handleEnterRoom}
                />
            )}
        </VStack>
    )
}