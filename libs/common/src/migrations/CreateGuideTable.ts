import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateGuideTable1723712816566 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Guide" DROP CONSTRAINT IF EXISTS "FK_3a2c4d7f8f3e5f3b1b0a2f5b3b1";`,
    );

    // Create the Guide table
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
    await queryRunner.dropTable('Guide');
  }
}
