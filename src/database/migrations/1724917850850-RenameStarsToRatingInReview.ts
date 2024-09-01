import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameStarsToRatingInReview1724917850850
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Review" RENAME COLUMN "stars" TO "rating"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Review" RENAME COLUMN "rating" TO "stars"`,
    );
  }
}
