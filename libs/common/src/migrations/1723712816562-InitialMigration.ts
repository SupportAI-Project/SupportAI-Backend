import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class InitialMigration1723712816562 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Message" DROP CONSTRAINT IF EXISTS "FK_c5370d7d3bc8ee603a401aee50e";`,
    );
    await queryRunner.query(
      `ALTER TABLE "Chat" DROP CONSTRAINT IF EXISTS "FK_3a2c4d7f8f3e5f3b1b0a2f5b3b1";`,
    );
    await queryRunner.query(
      `ALTER TABLE "Guide" DROP CONSTRAINT IF EXISTS "FK_3a2c4d7f8f3e5f3b1b0a2f5b3b1";`,
    );

    await queryRunner.createTable(
      new Table({
        name: 'Chat',
        columns: [
          {
            name: 'chatId',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'customerId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'startTime',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'endTime',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'isOpen',
            type: 'boolean',
            default: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'Message',
        columns: [
          {
            name: 'messageId',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'isSupportSender',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'isNote',
            type: 'boolean',
            default: false,
          },
          {
            name: 'timeStamp',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'content',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'chatId',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.query(
      `CREATE TYPE "role_enum" AS ENUM ('user', 'admin')`,
    );
    await queryRunner.createTable(
      new Table({
        name: 'User',
        columns: [
          {
            name: 'userId',
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

    await queryRunner.createTable(
      new Table({
        name: 'Guide',
        columns: [
          {
            name: 'guideId',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'contentHTML',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'creatorId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'Message',
      new TableForeignKey({
        columnNames: ['chatId'],
        referencedColumnNames: ['chatId'],
        referencedTableName: 'Chat',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'Chat',
      new TableForeignKey({
        columnNames: ['customerId'],
        referencedColumnNames: ['userId'],
        referencedTableName: 'User',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'Guide',
      new TableForeignKey({
        columnNames: ['creatorId'],
        referencedColumnNames: ['userId'],
        referencedTableName: 'User',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('Guide', 'FK_3a2c4d7f8f3e5f3b1b0a2f5b3b1');
    await queryRunner.dropForeignKey(
      'Message',
      'FK_4c3b7d8f7b0e4d9e7b0a2f5b3b1',
    );
    await queryRunner.dropForeignKey('Chat', 'FK_3a2c4d7f8f3e5f3b1b0a2f5b3b1');

    await queryRunner.dropTable('Guide');
    await queryRunner.dropTable('User');
    await queryRunner.dropTable('Message');
    await queryRunner.dropTable('Chat');

    await queryRunner.query('DROP TYPE "role_enum"');
  }
}
