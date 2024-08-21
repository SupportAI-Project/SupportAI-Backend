import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateReviewTable1623712816569 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Review',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'guideId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'rating',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'comment',
            type: 'text',
            isNullable: true,
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
      'Review',
      new TableForeignKey({
        columnNames: ['guideId'],
        referencedColumnNames: ['guideId'],
        referencedTableName: 'Guide',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'Review',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['userId'],
        referencedTableName: 'User',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('Review', 'FK_Review_Guide');
    await queryRunner.dropForeignKey('Review', 'FK_Review_User');
    await queryRunner.dropTable('Review');
  }
}
