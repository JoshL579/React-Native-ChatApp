import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { Center, HStack, Button, useTheme, Text, Box, Icon } from 'native-base';
import { AntDesign } from '@expo/vector-icons';


export default function SettingBanner(props) {
    const { title, content } = props;
    return (
        <HStack w="100%" p={4} 
            alignItems="center" 
            bg="blueGray.200" 
            shadow={1}
            mb={4}
        >
            <Box w={24}>
                <Text fontSize="2xl">{title}</Text>
            </Box>
            <Box flex={1} alignItems="flex-end">
                <Text fontSize="xl">{content}</Text>
            </Box>
            <Box w={8} alignItems="flex-end">
                <Icon
                    color="blueGray.500"
                    size={4}
                    as={
                        <AntDesign name="right" />
                    }
                />
            </Box>
        </HStack>
    )
}