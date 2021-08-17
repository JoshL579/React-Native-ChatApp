import { io } from 'socket.io-client';


export const baseUrl = 'http://192.168.1.66:5001';

// export const socket = io("http://127.0.0.1:5001/chat");
export const socket = io(baseUrl + "/chat");
