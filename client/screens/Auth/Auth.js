import React from 'react';
import styles from './style';
import { Center } from 'native-base';
import AuthForm from '../../components/AuthForm';


export default function Auth() {
    return(
        <Center flex={1} style={styles.container}>
            <AuthForm />
        </Center>
    )
}