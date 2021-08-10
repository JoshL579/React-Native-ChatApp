import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Center, VStack, Button, useTheme } from 'native-base';
import { deleteToken } from '../../utils/store';


export default function Chat() {
    const user = useContext(AuthContext);
    const handleLogout = () => {
        deleteToken().then((res) => {
            user.setUserId('')
        })
    }
    return (
        <VStack flex={1} w="100%">
            <Center mt={4}>
                <Button onPress={handleLogout} bg="blueGray.600" colorScheme="blueGray" w="100%">LogOut</Button>
            </Center>
        </VStack>
    )
}