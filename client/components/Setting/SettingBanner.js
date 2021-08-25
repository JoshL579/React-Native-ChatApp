import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { Center, HStack, Button, useTheme, Text, Box, Icon, Pressable } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import { upload } from '../../api/profile';
import { getToken } from '../../utils/store';


export default function SettingBanner(props) {
    const { title, content } = props;
    const [img, setImg] = useState({});

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
            base64: false
        });

        // console.log(result);

        if (!result.cancelled) {
            setImg(result.uri);
            
            getToken().then((token) => {
                const payload = {
                    img: result.uri,
                    token: token
                }
                upload(payload).then((res) => {
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                    //todo: add alert
                })
            })
            
        }
    };

    const handleUploadImg = () => {
        if (title.toLowerCase() === 'photo') {
            pickImage()
        }
    }

    return (
        <Pressable onPress={handleUploadImg}>
            <HStack w="100%" p={4}
                alignItems="center"
                bg="blueGray.200"
                shadow={1}
                mb={4}
            >
                <Box w={24}>
                    <Text fontSize="2xl">{title}</Text>
                </Box>
                <Box flex={1} alignItems="flex-end">
                    <Text fontSize="xl">{content}</Text>
                </Box>
                <Box w={8} alignItems="flex-end">
                    <Icon
                        color="blueGray.500"
                        size={4}
                        as={
                            <AntDesign name="right" />
                        }
                    />
                </Box>
            </HStack>
        </Pressable>
    )
}