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
import { SendMessageDto } from './message/dto/send-message.dto';
import { WsAuthGuard } from '@app/common';
import { AuthService } from 'src/auth/auth.service';
import { ChatRoomActionDto } from './message/dto/join-chat.dto';

@UseGuards(WsAuthGuard)
@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly authService: AuthService,
  ) {}

  @SubscribeMessage('create')
  async handleCreateChat(@ConnectedSocket() client: Socket) {
    const authToken = client.handshake.headers.cookie.split('=')[1];

    const { userId } = await this.authService.extractUserFromToken(authToken);
    if (!userId) {
      Logger.error('No customerId provided ' + userId, 'ChatGateway');
    }
    const chat = await this.chatService.createChat({
      customerId: userId,
    });
    client.emit('chatCreated', chat);
  }

  @SubscribeMessage('message')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: SendMessageDto,
  ) {
    const isSupportSender = data.isSupportSender || false;
    Logger.log('Received sendMessage event with data:', data);
    const message = await this.chatService.sendMessage({
      chatId: data.data.chatId,
      content: data.data.content,
      isSupportSender: isSupportSender,
      isNote: data.isNote,
    });
    Logger.log('Message sent:', message);
    this.server.to(`chat_${data.data.chatId}`).emit('newMessage', message);
  }

  @SubscribeMessage('join')
  async handleJoinChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: ChatRoomActionDto,
  ) {
    console.log('data', data);

    const chatId = data.chatId;
    client.join(`chat_${chatId}`);
    Logger.log(`Client ${client.id} joined chat_${chatId}`);
    client.emit('joined', `chat_${chatId}`);
  }

  @SubscribeMessage('leave')
  async handleLeaveChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: ChatRoomActionDto,
  ) {
    try {
      const chatId = data.chatId;
      client.leave(`chat_${chatId}`);
      Logger.log(`Client ${client.id} left chat_${chatId}`);
      client.emit('left', `chat_${chatId}`);
    } catch (error) {
      Logger.error('Error in handleLeaveChat:', error);
    }
  }

  handleConnection(client: Socket) {
    Logger.log('Client connected:', client.id);
    client.emit('connected', client.id);
  }

  handleDisconnect(client: Socket) {
    Logger.log('Client disconnected:', client.id);
  }

  afterInit() {
    Logger.log('Chat gateway initialized');
  }
}
