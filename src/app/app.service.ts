import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    Logger.log('AppService getHello');
    return 'Hello World!';
  }
}
