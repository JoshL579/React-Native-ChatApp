import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Center, HStack, Button, useTheme, Text, Box, Image } from 'native-base';


export default function ChatItem(props) {
    const { type, text, fromSelf } = props;

    if (type === 'join') {
        return (
            <Center py={2}>
                <Text fontSize="md" italic color="blueGray.600">{text}</Text>
            </Center>
        )
    }
    return (
        <Box p={2}>
            <HStack flexDirection={fromSelf ? "row-reverse" : "row"}>
                <Box bg="blueGray.400" w={10} h={10} mx={2} borderRadius={5} />
                <Box border={1}
                    borderColor="blueGray.200"
                    bg="blueGray.50"
                    borderRadius={5}
                    maxWidth="200px"
                    py={2}
                    px={3}
                >
                    <Center>
                        <Text>
                            {text}
                        </Text>
                    </Center>                    
                </Box>
            </HStack>
        </Box>
    )
}