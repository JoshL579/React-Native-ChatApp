import React from 'react';
import { Center, VStack } from 'native-base';
import RoomItem from '../../components/Rooms/RoomItem';

export default function Rooms() {

    return (
        <VStack flex={1} w="100%">
            <Center>
                <RoomItem />
                <RoomItem />
                <RoomItem />
                <RoomItem />
            </Center>

        </VStack>
    )
}