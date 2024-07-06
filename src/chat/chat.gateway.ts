import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('joinChat')
  handleJoinChat(client: Socket, { chatId, user }): void {
    // Add user to chat room
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, message: { chatId; content; sender }): void {
    // Save message to database
    // Broadcast message to users in the chat room
  }
}
