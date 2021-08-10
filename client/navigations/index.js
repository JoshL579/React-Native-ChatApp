import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import Auth from '../screens/Auth/Auth';
import Rooms from '../screens/Rooms/Rooms';
import Chat from '../screens/Profile/Profile';
import { AuthContext } from '../context/AuthContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function LoginActivity() {
    return (
        <Stack.Screen name="Login" component={Auth} />
    )
}

function MainActivity() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Chat" component={Rooms} options={{
                title: 'Chat',
                tabBarIcon: ({ size, focused, color }) => {
                    return (
                        <MaterialCommunityIcons name="chat-outline" size={size} color={color} />

                    );
                },
            }} />
            <Tab.Screen name="Profile" component={Chat} options={{
                title: 'Profile',
                tabBarIcon: ({ size, focused, color }) => {
                    return (
                        <Feather name="user" size={size} color={color} />
                    );
                },
            }} />
        </Tab.Navigator>
    )
}


export default function NavBarBottom() {
    const user = useContext(AuthContext)
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    user.userId ?
                        <Stack.Screen name="Main" component={MainActivity}  options={{ headerShown: false }}/>
                    :
                        <Stack.Screen name="Login" component={Auth} options={{ headerShown: false }} />

                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}