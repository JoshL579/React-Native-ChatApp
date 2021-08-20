import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { theme } from './theme/theme';
import { NativeBaseProvider } from 'native-base';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import { SocketProvider } from './context/SocketContext';
import NavBarBottom from './navigations';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NativeBaseProvider theme={theme}>
        <AuthContextProvider>
          <SocketProvider>
            <ChatContextProvider>
              <NavBarBottom />
            </ChatContextProvider>
          </SocketProvider>
        </AuthContextProvider>
      </NativeBaseProvider>
    </SafeAreaView>
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
