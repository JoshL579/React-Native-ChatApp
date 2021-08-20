import { io } from 'socket.io-client';
import { BASE_URL } from 'react-native-dotenv';

export const baseUrl = BASE_URL;
export const socket = io(baseUrl + "/chat");
