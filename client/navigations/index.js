import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getToken } from '../utils/store';
import Auth from '../screens/Auth/Auth';
import Rooms from '../screens/Rooms/Rooms';
import Chat from '../screens/Chat/Chat';

const Tab = createBottomTabNavigator();

export default function NavBarBottom() {
    return (
        <>
            {
                getToken() ? 
                <NavigationContainer>
                    <Tab.Navigator>
                        {/* <Tab.Screen name="Login" component={Auth} /> */}
                        <Tab.Screen name="Rooms" component={Rooms} />
                        <Tab.Screen name="Chat" component={Chat} />
                    </Tab.Navigator>
                </NavigationContainer> 
                :
                <Auth />
            }
        </>
        
    );
}