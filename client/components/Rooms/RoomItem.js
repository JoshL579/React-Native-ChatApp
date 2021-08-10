import React from 'react';
import { Text, Divider, Box } from 'native-base';

export default function RoomItem(props) {
    const { name } = props;
    return (
        <>
            <Box width="100%" px={4} py={3} bg='lightGery.200'>
                <Text fontSize="2xl">
                    {name}
                </Text>
            </Box>
            <Divider />
        </>
    )
}