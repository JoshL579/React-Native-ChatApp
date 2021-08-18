import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Center, Input, Box, Button, Flex } from 'native-base';
import { StyleSheet } from 'react-native';


export default function ChatInput(props) {
    const { handleSend } = props;
    const [input, setInput] = useState('');
    const handleInputChange = (text) => {
        setInput(text)
    }
    const handleSendPress = () => {
        handleSend(input)
        setInput('')
    }
    return (
        <Center p={2} flex={1}>
            <Flex direction="row" w="100%" align="center" justify="center">
                <Flex direction="column" flex={0.8}>
                    <Input
                        py={0}
                        px={4}
                        variant="filled"
                        bg="blueGray.200"
                        placeholder="Enter Your Message Here..."
                        // size="md"
                        // flex={1}
                        h={10}
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}
                        _focus={{
                            // borderColor:"blueGray.500",
                            shadow: 'none',
                            border: 'none'
                        }}
                        value={input}
                        onChangeText={(text) => handleInputChange(text)}
                    />
                </Flex>
                <Flex direction="column" flex={0.2}>
                    <Button bg="blueGray.600" 
                        h={10}
                        // size="md" 
                        // flex={1} 
                        onPress={handleSendPress}
                    >
                        Send
                    </Button>
                </Flex>
            </Flex>
        </Center>
    )
}

const styles = StyleSheet.create({
    inputFocus: {
        borderWidth: 0,
        borderRadius: 2,
        borderColor: 'transparent',
        borderBottomWidth: 0,
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 2,
        elevation: 0,
    }
});