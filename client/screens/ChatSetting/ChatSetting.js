import React, { useContext, useEffect, useState } from 'react';
import { Center, VStack, HStack, Input, Icon, Box, Text, Button } from 'native-base';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { SettingTitle } from '../../components/ChatSetting/SettingHeader';
import { SettingInfo } from '../../components/ChatSetting/SettingInfo';

export default function ChatSetting() {
    const { currentRoom } = useContext(AuthContext);

    const handleLeaveRoom = () => {
        socket.emit("leave", {
            uid: userId,
            username: userName,
            roomId: '1001',
        });
    }

    return (
        <VStack flex={1} w="100%">
            <SettingTitle
                title={currentRoom.name}
            />
            <SettingInfo
                roomId={currentRoom.id}
            />
            <Button
                bg="blueGray.600"
                colorScheme="blueGray"
                mt={4} o
                nPress={handleLeaveRoom}
            >
                Leave Room
            </Button>
        </VStack>
    )
}