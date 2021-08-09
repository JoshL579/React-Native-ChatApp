import React from 'react';
import { Text, Divider, Box } from 'native-base';

export default function RoomItem() {

    return (
        <>
            <Box width="100%" px={4} py={3} bg='lightBlue.200'>
                <Text fontSize="2xl">
                    Game Talk
                </Text>
            </Box>
            <Divider />
        </>
    )
}