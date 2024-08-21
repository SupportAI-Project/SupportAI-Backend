import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMessageTable1723712816564 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Message" DROP CONSTRAINT IF EXISTS "FK_c5370d7d3bc8ee603a401aee50e";`,
    );

    await queryRunner.createTable(
      new Table({
        name: 'Message',
        columns: [
          {
            name: 'id',
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

    await queryRunner.createForeignKey(
      'Message',
      new TableForeignKey({
        columnNames: ['chatId'],
        referencedColumnNames: ['chatId'],
        referencedTableName: 'Chat',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'Message',
      'FK_c5370d7d3bc8ee603a401aee50e',
    );
    await queryRunner.dropTable('Message');
  }
}
