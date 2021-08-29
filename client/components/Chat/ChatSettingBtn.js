import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Pressable, Icon } from 'native-base';
import { navigateFromOutside } from '../../navigations/navigationRef';

export const ChatSettingBtn = () => {
    const NavigateToChatSetting = () => {
        navigateFromOutside('ChatSetting')
    }
    return (
        <Pressable onPress={NavigateToChatSetting} px={4} py={2}>
            <Icon
                size={6}
                color="blueGray.900"
                as={<AntDesign name="setting" />}
            />
        </Pressable>
    )
}