import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../../libs/common/src/entities/user.entity';
import { config } from 'dotenv';
import { Chat } from '../chat/entities/chat.entity';
import { Message } from '../chat/message/entities/message.entity';
import { Guide } from '../guide/entities/guide.entity';
import { Review } from '../review/entities/review.entity';
import { Issue } from '../issue/entities/issue.entity';

config();

export const configDataSource: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Chat, Message, Guide, Review, Issue],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: process.env.SYNCHRONIZE === 'true',
  logging: true,
};

const dataSource: DataSource = new DataSource(configDataSource);
dataSource.initialize();
export default dataSource;
