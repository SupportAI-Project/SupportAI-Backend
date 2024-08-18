import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

export class CreateReviewTable1623712816567 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Review',
        columns: [
          {
            name: 'reviewId',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'guideId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'stars',
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

    // Add a unique constraint on userId and guideId combination
    await queryRunner.createUniqueConstraint(
      'Review',
      new TableUnique({
        name: 'UQ_userId_guideId',
        columnNames: ['userId', 'guideId'],
      }),
    );

    // Create foreign key for the userId column
    await queryRunner.createForeignKey(
      'Review',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['userId'],
        referencedTableName: 'User',
        onDelete: 'CASCADE',
      }),
    );

    // Create foreign key for the guideId column
    await queryRunner.createForeignKey(
      'Review',
      new TableForeignKey({
        columnNames: ['guideId'],
        referencedColumnNames: ['guideId'],
        referencedTableName: 'Guide',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('Review', 'UQ_userId_guideId');

    await queryRunner.dropForeignKey('Review', 'FK_Review_userId');
    await queryRunner.dropForeignKey('Review', 'FK_Review_guideId');

    await queryRunner.dropTable('Review');
  }
}
