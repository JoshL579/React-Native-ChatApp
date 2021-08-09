import React, { useState } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { Input, Stack, Center, Heading, Button } from 'native-base';
import { login } from '../../api/auth';
import { setToken } from '../../utils/store';


export default function AuthForm(props) {
    const { navigation } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = () => {
        const payload = {
            email: email,
            password: password
        }
        login(payload).then((res) => {
            console.log(res)
            setToken(res.token)
            navigation.navigate('Rooms')
        }).catch((err) => {
            console.log(err)
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