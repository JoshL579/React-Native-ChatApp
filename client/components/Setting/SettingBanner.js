import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { Center, HStack, Button, useTheme, Text, Box, Icon, Pressable, Image } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import { upload } from '../../api/profile';
import { getToken } from '../../utils/store';
import { SettingModal } from './SettingModal';


export default function SettingBanner(props) {
    const { title, content, type } = props;
    // const [img, setImg] = useState({});
    const [modalOpen, setModalOpen] = useState(false);

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
            base64: true
        });

        if (!result.cancelled) {
            // setImg(result.base64);
            const payload = { img: result.base64 }
            upload(payload).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
                //todo: add alert
            })
        }
    };

    const handleUpdateClick = () => {
        if (type === 'image') {
            return pickImage()
        }
        if (type === 'uid') return
        setModalOpen(true)
    }

    const handleConfirm = () => {

    }

    return (
        <>
            <Pressable onPress={handleUpdateClick}>
                <HStack w="100%" p={4}
                    alignItems="center"
                    bg="blueGray.100"
                    // shadow={1}
                    // mb={4}
                    borderBottomColor="blueGray.200"
                    borderBottomWidth={1}
                >
                    <Box w={24}>
                        <Text fontSize="xl">{title}</Text>
                    </Box>
                    <Box flex={1} alignItems="flex-end">
                        {type === 'image' ?
                            <Image
                                size={12}
                                source={{
                                    uri: content
                                }}
                                alt="ChatApp"
                            />
                            :
                            <Text fontSize="md">{content}</Text>
                        }
                    </Box>
                    <Box w={8} alignItems="flex-end">
                        {type !== 'uid' &&
                            <Icon
                                color="blueGray.500"
                                size={4}
                                as={
                                    <AntDesign name="right" />
                                }
                            />
                        }
                    </Box>
                </HStack>
            </Pressable>
            <SettingModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                handleConfirm={handleConfirm}
                type={type}
            />
        </>
    )
}