import React, { useContext, useEffect, useState } from 'react';
import { Center, VStack, HStack, Input } from 'native-base';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

export default function Search(props) {

    return (
        <VStack flex={1} w="100%">
            <HStack>
                <Input />
            </HStack>
        </VStack>
    )
}