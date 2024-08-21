import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateChatTable1723712816563 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Chat" DROP CONSTRAINT IF EXISTS "FK_3a2c4d7f8f3e5f3b1b0a2f5b3b1";`,
    );

    await queryRunner.createTable(
      new Table({
        name: 'Chat',
        columns: [
          {
            name: 'id',
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

    await queryRunner.createForeignKey(
      'Chat',
      new TableForeignKey({
        columnNames: ['customerId'],
        referencedColumnNames: ['userId'],
        referencedTableName: 'User',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('Chat', 'FK_3a2c4d7f8f3e5f3b1b0a2f5b3b1');
    await queryRunner.dropTable('Chat');
  }
}
