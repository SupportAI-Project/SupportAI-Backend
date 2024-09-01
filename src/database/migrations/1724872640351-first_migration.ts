import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1724872640351 implements MigrationInterface {
  name = 'FirstMigration1724872640351';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Issue" ("id" SERIAL NOT NULL, "categories" text NOT NULL, "singletonKey" integer NOT NULL DEFAULT '1', CONSTRAINT "UQ_8ce63f39f1f601542a9ed1baf99" UNIQUE ("singletonKey"), CONSTRAINT "PK_f1c382f36593c95dc016446a9e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "Review" ADD "title" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "Guide" ADD "categories" text[] NOT NULL DEFAULT '{}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Guide" DROP COLUMN "categories"`);
    await queryRunner.query(`ALTER TABLE "Review" DROP COLUMN "title"`);
    await queryRunner.query(`DROP TABLE "Issue"`);
  }
}
