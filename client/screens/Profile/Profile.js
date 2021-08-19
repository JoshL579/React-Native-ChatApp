import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { Center, VStack, Button, useTheme } from 'native-base';
import { deleteToken, deleteChatHistory } from '../../utils/store';


export default function Profile() {
    const user = useContext(AuthContext);
    const chatHistory = useContext(ChatContext);
    const handleLogout = () => {
        deleteToken().then((res) => {
            user.setUserId('')
        })
    }
    const handleClearHistory = () => {
        deleteChatHistory()
        chatHistory.setChats('')
    }
    return (
        <VStack flex={1} w="100%">
            <Center mt={4}>
                <Button onPress={handleLogout} bg="blueGray.600" colorScheme="blueGray" w="100%">LogOut</Button>
            </Center>
            <Center mt={4}>
                <Button onPress={handleClearHistory} bg="blueGray.600" colorScheme="blueGray" w="100%">Clear History</Button>
            </Center>
        </VStack>
    )
}