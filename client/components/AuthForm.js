import React, { useState } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { Input, Stack, Center, Heading, Button } from 'native-base';


export default function AuthForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = () => {
        fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then((res) => {
            console.log(res)
            return res.json()
        }).then((res) => {
            console.log(res)
        })
    }


    return (
        <Stack space={3} alignItems="center" w="100%" justifyContent="center">
            <Center>
                <Heading>Login</Heading>
            </Center>
            <Input
                variant="underlined"
                placeholder="EMAIL"
                size="md"
                w="100%"
                _light={{
                    placeholderTextColor: "blueGray.400",
                }}
                _dark={{
                    placeholderTextColor: "blueGray.50",
                }}
                value={email}
                onChange={handleEmailChange}
            />
            <Input
                variant="underlined"
                placeholder="PASSWORD"
                size="md"
                w="100%"
                _light={{
                    placeholderTextColor: "blueGray.400",
                }}
                _dark={{
                    placeholderTextColor: "blueGray.50",
                }}
                type="password"
                value={password}
                onChange={handlePasswordChange}
            />
            <Button
                size="md"
                colorScheme="secondary"
                onPress={handleLogin}
                w="100%"
            >
                Login
            </Button>
        </Stack>
    )
}