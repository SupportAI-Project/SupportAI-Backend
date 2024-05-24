import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { z } from 'zod';

const envVarsSchema = z.object({
  PG_HOST: z.string(),
  PG_USER: z.string(),
  PG_PASSWORD: z.string(),
  PG_DATABASE: z.string(),
  SYNCHRONIZE: z.string(),
});

export const databaseConfig: () => TypeOrmModuleOptions = () => {
  const {
    PG_HOST,
    PG_USER,
    PG_PASSWORD,
    PG_DATABASE,
    SYNCHRONIZE: SYNC_STRING,
  } = envVarsSchema.parse(process.env);

  const SYNCHRONIZE = SYNC_STRING.toLowerCase() === 'true';

  return {
    type: 'postgres',
    host: PG_HOST,
    username: PG_USER,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    ssl: true,
    autoLoadEntities: true,
    synchronize: SYNCHRONIZE,
  };
};
