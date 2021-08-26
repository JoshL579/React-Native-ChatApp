import React, { useState, useContext } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { Input, Stack, Center, Heading, Button } from 'native-base';
import { login } from '../../api/auth';
import { setToken } from '../../utils/store';
import { AuthContext } from '../../context/AuthContext';


export default function AuthForm(props) {
    const { navigation } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = useContext(AuthContext);

    const handleEmailChange = (text) => {
        setEmail(text)
    }

    const handlePasswordChange = (text) => {
        setPassword(text)
    }

    const handleLogin = () => {
        const payload = {
            email: email.trim().toLowerCase(),
            password: password.trim().toLowerCase()
        }
        login(payload).then((res) => {
            if (!setToken(res.token)) throw Error('Unable to set login info, please try again')
            user.setUserId(res.uid)
            user.setUserName(res.name)
            if (res.img) {
                user.setUserPic(baseUrl + '/api/file/' + res.uid)
            } else {
                user.setUserPic(headIcon)
            }
        }).catch((err) => {
            console.log(err)
            //todo: add alert
        })
    }


    return (
        <Stack space={3} alignItems="center" w="100%" justifyContent="center">
            <Center>
                <Heading color="blueGray.600">Login</Heading>
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
                onChangeText={(text) => handleEmailChange(text)}
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
                onChangeText={(text) => handlePasswordChange(text)}
            />
            <Button
                size="md"
                bg="blueGray.600"
                colorScheme="blueGray"
                onPress={handleLogin}
                w="100%"
            >
                Login
            </Button>
        </Stack>
    )
}