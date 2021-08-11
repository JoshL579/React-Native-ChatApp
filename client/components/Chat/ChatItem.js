import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Center, VStack, Button, useTheme, Text } from 'native-base';


export default function ChatItem(props) {
    const { type, text } = props;

    if (type === 'join') {
        return (
            <Center mt={2}>
                <Text fontSize="md" italic>{text}</Text>
            </Center>
        )
    }
    return (
        <Text fontSize="md">this is massage sent or received</Text>
    )
}