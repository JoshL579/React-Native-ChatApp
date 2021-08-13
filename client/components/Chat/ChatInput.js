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
        <Center p={2}>
            <Flex direction="row" w="100%" align="center" justify="center" s>
                <Input
                    variant="filled"
                    bg="blueGray.200"
                    placeholder="Enter Your Message Here..."
                    size="md"
                    flex={0.8}
                    h="100%"
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
                <Button bg="blueGray.600" size="md" flex={0.2} h="100%" onPress={handleSendPress}>
                    Send
                </Button>
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