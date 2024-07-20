import { DataSource } from 'typeorm';
import { User } from '../libs/common/src/entities/user.entity';
import { Chat } from './entities/chat.entity';
import { config } from 'dotenv';
import { Message } from './entities/message.entity';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT, 10),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Chat, Message],
  migrations: ['src/migration/**/*.ts'],
  synchronize: process.env.SYNCHRONIZE === 'true',
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
