import React, { useContext, useEffect, useState } from 'react';
import { Center, VStack, HStack, Input, Icon, Box, Text, Image } from 'native-base';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

export const SettingTitle = (props) => {
    const { title } = props;
    return (
        <HStack space={2} p={4} bg="blueGray.200">
            <Box w={16} h={16} bg="blueGray.500" borderRadius={6}>
                <Image w={16} source={{ uri: '' }} />
            </Box>
            <VStack flex={1}>
                <Box>
                    <Text fontSize="2xl">
                        {title}
                    </Text>
                </Box>
                <HStack mt={2}>
                    <Box mr={4}>
                        <Text fontSize="md">
                            Member 4,875
                        </Text>
                    </Box>
                    <Box>
                        <Text fontSize="md">
                            Online 296
                        </Text>
                    </Box>
                </HStack>
            </VStack>
        </HStack>
    )
}