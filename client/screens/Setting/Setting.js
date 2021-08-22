import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { Center, VStack, Button, useTheme, Text, Box } from 'native-base';
import SettingBanner from '../../components/Setting/SettingBanner';


export default function Setting() {
    const {userName, userId} = useContext(AuthContext);
    const settingList = [
        {
            title: 'Photo',
            content: ''
        },
        {
            title: 'Name',
            content: userName
        },
        {
            title: 'ID',
            content: userId
        },
    ]

    return (
        <VStack flex={1} w="100%">
            {settingList.map((item) => 
                <SettingBanner title={item.title} content={item.content} key={item.title} />
            )}
        </VStack>
    )
}