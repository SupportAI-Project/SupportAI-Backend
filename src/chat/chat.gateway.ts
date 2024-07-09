import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { Logger, UseGuards } from '@nestjs/common';
import { createChatServerDto } from './message/dto/create-chatserver.dto';
import { SendMessageDto } from './message/dto/send-message.dto';
import { JwtAuthGuard } from '@app/common';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('createChat')
  async handleCreateChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: createChatServerDto,
  ) {
    Logger.log('Received createChat event with user: ' + data);
    const customerId = data.data.customerId;
    Logger.log('Received createChat event with customerId: ' + customerId);
    if (!customerId) {
      Logger.error('No customerId provided ' + customerId);
    }
    const chat = await this.chatService.createChat({
      customerId: customerId,
    });
    Logger.log('Chat created:', chat);
    client.emit('chatCreated', chat);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: SendMessageDto,
  ) {
    const isSupportSender = false;
    Logger.log('Received sendMessage event with data:', data);
    const message = await this.chatService.sendMessage(
      data.data.chatId,
      data.data.content,
      isSupportSender,
    );
    Logger.log('Message sent:', message);
    this.server.to(`chat_${data.data.chatId}`).emit('newMessage', message);
  }

  @SubscribeMessage('test')
  async handleTest(@ConnectedSocket() client: Socket) {
    Logger.log(`client is : ${JSON.stringify(client.handshake.headers)}`);
    client.emit('test', 'test');
  }

  handleConnection(client: Socket) {
    Logger.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    Logger.log('Client disconnected:', client.id);
  }
}
