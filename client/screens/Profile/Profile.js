import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { Center, VStack, Button, useTheme, Text, Box } from 'native-base';
import { deleteToken, deleteChatHistory } from '../../utils/store';
import UserInfoBanner from '../../components/Profile/UserInfoBanner';

// notification part
// import * as Notifications from 'expo-notifications';
// import { sendPushNotification, registerForPushNotificationsAsync, sendLocalNotification } from '../../service/notification';

export default function Profile() {
    const user = useContext(AuthContext);
    const chatHistory = useContext(ChatContext);
    const handleLogout = () => {
        deleteToken().then((res) => {
            user.setUserId('')
        })
    }
    const handleClearHistory = () => {
        deleteChatHistory()
        chatHistory.setChats('')
    }


    // notification part -------------------------------------------------------
    // const [expoPushToken, setExpoPushToken] = useState('');
    // const [notification, setNotification] = useState(false);
    // const notificationListener = useRef();
    // const responseListener = useRef();

    // useEffect(() => {
    //     registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    //     // This listener is fired whenever a notification is received while the app is foregrounded
    //     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //         setNotification(notification);
    //     });

    //     // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    //     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //         console.log(response);
    //     });

    //     return () => {
    //         Notifications.removeNotificationSubscription(notificationListener.current);
    //         Notifications.removeNotificationSubscription(responseListener.current);
    //     };
    // }, []);


    return (
        <VStack flex={1} w="100%">
            <Box>
                <UserInfoBanner />
            </Box>
            <Center mt={4}>
                <Button onPress={handleLogout} bg="blueGray.500" colorScheme="blueGray" w="100%" py={4}>
                    LogOut
                </Button>
            </Center>
            <Center mt={4}>
                <Button onPress={handleClearHistory} bg="blueGray.500" colorScheme="blueGray" w="100%" py={4}>
                    Clear History
                </Button>
            </Center>
            {/* <Center mt={4}>
                <Text>Your expo push token: {expoPushToken}</Text>
                <Button
                    // onPress={async () => {
                    //     await sendPushNotification(expoPushToken);
                    // }}
                    onPress={async () => {
                        await sendLocalNotification();
                    }}
                    bg="blueGray.600" colorScheme="blueGray" w="100%"
                >
                    Push Notification
                </Button>
            </Center> */}
        </VStack>
    )
}