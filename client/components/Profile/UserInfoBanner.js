import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Center, HStack, Button, useTheme, Text, Box, Image, VStack, Icon } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

export default function UserInfoBanner(props) {
    const { userId, userName } = useContext(AuthContext);
    return (
        <HStack px={2} py={6} space={2}
            borderColor="blueGray.200" borderWidth={1} borderTopWidth={0}
            bg="blueGray.100" shadow={0}
        >
            <Box bg="blueGray.400" w={16} h={16} mx={2} borderRadius={5}></Box>
            <VStack flex={1} space={2}>
                <Text fontSize="2xl">
                    {userName}
                </Text>
                <HStack>
                    <Box flex={1} fontSize="md">
                        <Text color="blueGray.500">
                            ID: {userId}
                        </Text>
                    </Box>
                    <Box w={12}>
                        <Icon
                            color="blueGray.500"
                            size={4}
                            as={
                                <AntDesign name="right" />
                            }
                        />
                    </Box>
                </HStack>
            </VStack>
        </HStack>
    )
}