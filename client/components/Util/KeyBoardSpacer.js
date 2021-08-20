import React, { useState, useEffect } from 'react';
import { Keyboard, View, Platform, LayoutAnimation } from 'react-native';

const defaultAnimation = {
    duration: 500,
    create: {
        duration: 300,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity
    },
    update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 200
    }
};

export default function KeyboardSpacer(props) {
    const [height, setHeight] = useState(0);
    const { toggle, offset } = props;

    const updateKeyboardSpace = (e) => {
        if (!e.endCoordinates) return
        const keyboardHeight = e.endCoordinates.height - (offset ? offset : 0)
        setHeight(keyboardHeight)
        return toggle(true)
    }

    const resetKeyboardSpace = () => {
        setHeight(0)
        return toggle(false)
    }

    useEffect(() => {
        const updateListener = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
        const resetListener = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
        Keyboard.addListener(updateListener, updateKeyboardSpace);
        Keyboard.addListener(resetListener, resetKeyboardSpace)
    }, [])

    return (
        <View style={{ height: height }} />
    )
}