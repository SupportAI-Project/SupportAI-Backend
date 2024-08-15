import { DataSource } from 'typeorm';
import { z } from 'zod';
import * as dotenv from 'dotenv';

dotenv.config();

const envVarsSchema = z.object({
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DATABASE: z.string(),
  SYNCHRONIZE: z.string(),
  SSL: z.string().optional().default('false'),
});

const parsedEnv = envVarsSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment variables:', parsedEnv.error);
  process.exit(1);
}

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  SYNCHRONIZE: SYNC_STRING,
  SSL: SSL_STRING,
} = parsedEnv.data;

const SYNCHRONIZE = SYNC_STRING.toLowerCase() === 'true';
const SSL = SSL_STRING.toLowerCase() === 'true';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT, 10),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,
  ssl: SSL,
  synchronize: SYNCHRONIZE,
  entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
});
