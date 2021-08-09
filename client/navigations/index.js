import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Auth from '../screens/Auth/Auth';
import Rooms from '../screens/Rooms/Rooms';
import Chat from '../screens/Chat/Chat';

const Tab = createBottomTabNavigator();

export default function NavBarBottom() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Login" component={Auth} />
                <Tab.Screen name="Rooms" component={Rooms} />
                <Tab.Screen name="Chat" component={Chat} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}