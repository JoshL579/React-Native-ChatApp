import React, { useContext, useEffect, useState } from 'react';
import { Center, VStack, HStack, Input, Icon, Box, Text } from 'native-base';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { SettingTitle } from '../../components/ChatSetting/SettingItem';

export default function ChatSetting() {
    const { currentRoom } = useContext(AuthContext);

    return (
        <VStack flex={1} w="100%">
            <SettingTitle
                title={currentRoom.name}
            />
        </VStack>
    )
}