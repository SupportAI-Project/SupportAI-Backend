import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DataSource as Connection } from 'typeorm';
import { testDatabaseConnection } from '@app/common';
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

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
