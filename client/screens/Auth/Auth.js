import React from 'react';
import styles from './style';
import { Center } from 'native-base';
import AuthForm from '../../components/Auth/AuthForm';
import { getToken } from '../../utils/store';
import { useFocusEffect } from '@react-navigation/native';


export default function Auth(props) {
    const { navigation } = props;
    // useFocusEffect(() => {
    //     if (getToken()) return navigation.navigate('Main', {screen: 'Rooms'})
    // });

    return(
        <Center flex={1} style={styles.container}>
            <AuthForm navigation={navigation} />
        </Center>
    )
}