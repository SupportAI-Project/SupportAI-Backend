import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateGuideTable1623712816567 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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
            name: 'starsTotalSum',
            type: 'int',
            isNullable: false,
            default: 0,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    // Create the foreign key constraint for creatorId
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
    // Drop the foreign key first
    await queryRunner.dropForeignKey('Guide', 'FK_guide_creatorId_userId');

    // Drop the Guide table
    await queryRunner.dropTable('Guide');
  }
}
