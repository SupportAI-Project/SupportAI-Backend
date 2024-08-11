export class SendMessageDto {
  event: string;
  data: {
    chatId: number;
    content: string;
  };
  isSupportSender?: boolean;
  isNote?: boolean;
}
