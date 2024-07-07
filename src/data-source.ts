import { DataSource } from 'typeorm';
import { User } from '../libs/common/src/entities/user.entity';
import { Chat } from '../libs/common/src/entities/chat.entity';
import { config } from 'dotenv';
import { Message } from '../libs/common/src/entities/message.entity';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT, 10),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Chat, Message], // Include all your entities here
  migrations: ['src/migration/**/*.ts'],
  synchronize: false,
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
