import React, { useContext, useEffect, useState } from 'react';
import { Box, Text, Divider, Switch, HStack, VStack, Center } from 'native-base';

export const SettingInfo = (props) => {
    const { roomId } = props;
    return (
        <>
            <Box bg="blueGray.50" p={4}>
                <Text fontSize="xl" color="blueGray.600">
                    Info
                </Text>
                <Text mt={2}>
                    Room ID: {roomId}
                </Text>
            </Box>
            <Divider />
            <HStack bg="blueGray.50" p={4}>
                <VStack flex={1}>
                    <Text fontSize="xl">
                        Notification
                    </Text>
                    <Text mt={2}>
                        Open
                    </Text>
                </VStack>
                <Divider orientation="vertical" />
                <Box w={16} alignItems="flex-end" justifyContent="center">
                    <Switch />
                </Box>
            </HStack>
        </>
    )
}