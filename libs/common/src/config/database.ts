import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { z } from 'zod';

const envVarsSchema = z.object({
  POSTGRES_HOST: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DATABASE: z.string(),
  SYNCHRONIZE: z.string(),
  SSL: z.string().optional().default('false'),
});

export const databaseConfig: () => TypeOrmModuleOptions = () => {
  const {
    POSTGRES_HOST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DATABASE,
    SYNCHRONIZE: SYNC_STRING,
    SSL: SSL_STRING,
  } = envVarsSchema.parse(process.env);

  const SYNCHRONIZE = SYNC_STRING.toLowerCase() === 'true';
  const SSL = SSL_STRING.toLowerCase() === 'true';

  return {
    type: 'postgres',
    host: POSTGRES_HOST,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DATABASE,
    ssl: SSL,
    autoLoadEntities: true,
    synchronize: SYNCHRONIZE,
  };
};
