import React, { useContext } from 'react';
import {
    Menu,
    Divider,
    Pressable,
    Box,
    Text,
    HStack,
    Icon
} from 'native-base';
import { ChatContext } from '../../context/ChatContext';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function AddMenu(props) {
    return (
        <Box p={4}>
            <Menu
                trigger={(triggerProps) => {
                    return (
                        <Pressable
                            {...triggerProps}
                        >
                            <MaterialIcons
                                name="add-circle-outline"
                                size={24}
                                color="black"
                            />
                        </Pressable>
                    )
                }}
                placement="bottom right"
                mt={2}
                p={0}
            >
                <Menu.Item>
                    <HStack>
                        <Icon
                            as={<MaterialCommunityIcons name="chat-plus-outline" />}
                            size={6}
                            color="blueGray.900"
                        />
                        <Text pl={2} color="blueGray.900">
                            Add Chat Room
                        </Text>
                    </HStack>
                </Menu.Item>
                <Divider />
                <Menu.Item>
                    <HStack>
                        <Icon
                            as={<AntDesign name="adduser" />}
                            size={6}
                            color="blueGray.900"
                        />                        
                        <Text pl={2} color="blueGray.900">
                            Add Friend
                        </Text>
                    </HStack>
                </Menu.Item>
            </Menu>
        </Box>
    )
}