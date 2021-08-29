import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { Center, VStack, Button, useTheme, Text, Box } from 'native-base';
import SettingBanner from '../../components/Setting/SettingBanner';


export default function Setting() {
    const { userName, userId, userPic } = useContext(AuthContext);
    const settingList = [
        {
            title: 'Photo',
            content: userPic,
            type: 'image'
        },
        {
            title: 'ID',
            content: userId,
            type: 'uid'
        },
        {
            title: 'Name',
            content: userName,
            type: 'username'
        },
        {
            title: 'Email',
            content: userName,
            type: 'email'
        },
        {
            title: 'Gender',
            content: userName,
            type: 'gender'
        },
    ]

    return (
        <VStack flex={1} w="100%">
            {settingList.map((item) =>
                <SettingBanner
                    title={item.title}
                    content={item.content}
                    key={item.title}
                    type={item.type}
                />
            )}
        </VStack>
    )
}