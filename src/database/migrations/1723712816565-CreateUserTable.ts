import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1723712816565 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DO $$ 
        BEGIN
          IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role_enum') THEN
            DROP TYPE "role_enum";
          END IF;
        END $$;
      `);

    await queryRunner.query(
      `CREATE TYPE "role_enum" AS ENUM ('user', 'admin')`,
    );

    await queryRunner.createTable(
      new Table({
        name: 'User',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'roles',
            type: 'role_enum',
            isArray: true,
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('User');
    await queryRunner.query('DROP TYPE "role_enum"');
  }
}
