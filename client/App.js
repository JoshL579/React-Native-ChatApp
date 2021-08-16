import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import NavBarBottom from './navigations';

export default function App() {
  return (
    <NativeBaseProvider>
      <AuthContextProvider>
        <ChatContextProvider>
          <NavBarBottom />
        </ChatContextProvider>
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
