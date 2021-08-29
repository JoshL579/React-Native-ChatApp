import React, { useContext, useEffect, useState } from 'react';
import { Center, VStack, HStack, Input, Icon, Box, Text } from 'native-base';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import SearchInput from '../../components/Search/SearchInput';

export default function ChatSetting({ route }) {

    return (
        <VStack flex={1} w="100%">
            <Text>This is Chat Setting</Text>
        </VStack>
    )
}