import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DataSource as Connection } from 'typeorm';
import { testDatabaseConnection } from '../libs/common/src';
import { Logger, ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const isDatabaseConnected = await testDatabaseConnection(app.get(Connection));
  app.enableCors({
    origin: 'localhost:3000',
  });
  isDatabaseConnected
    ? logger.log(isDatabaseConnected)
    : logger.error(isDatabaseConnected);

  await app.listen(3000);
}
bootstrap();
