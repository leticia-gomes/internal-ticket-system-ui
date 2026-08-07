import { io } from 'socket.io-client'

export const socket = io(import.meta.env.VITE_API_URL, {
  autoConnect: false,
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('Connected:', socket.id);
});

socket.on('disconnect', () => {
  console.log('Disconnected');
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});

console.log('API URL:', import.meta.env.VITE_API_URL);

export default socket
