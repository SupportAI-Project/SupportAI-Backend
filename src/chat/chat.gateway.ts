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
import { CreateChatServerDto } from './message/dto/CreateChatServer.dto';
import { SendMessageDto } from './message/dto/send-message.dto';
import { WsAuthGuard } from '@app/common/guards/ws-auth.guard';
import { User } from '@app/common';
import { AuthService } from 'src/auth/auth.service';

@UseGuards(WsAuthGuard)
@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  user?: User;

  constructor(
    private readonly chatService: ChatService,
    private readonly authService: AuthService,
  ) {}

  @SubscribeMessage('create')
  async handleCreateChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: CreateChatServerDto,
  ) {
    const auth_token = client.handshake.headers.authorization;
    const { userId } = await this.authService.extractUserFromToken(auth_token);
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
    Logger.log(`auth token is: ${client.handshake.headers.authorization}`);
    client.emit('test', 'testing');
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
