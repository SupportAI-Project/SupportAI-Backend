import { MigrationInterface, QueryRunner } from 'typeorm';

export class AllowNullRoles1719944243798 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "User" ALTER COLUMN "roles" DROP NOT NULL`,
    );
    await queryRunner.query(
      `UPDATE "User" SET roles = '{}' WHERE roles IS NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "User" ALTER COLUMN "roles" SET NOT NULL`,
    );
  }
}
