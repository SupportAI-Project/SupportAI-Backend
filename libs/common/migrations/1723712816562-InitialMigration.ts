import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1723712816562 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Chat" (
        "chatId" SERIAL PRIMARY KEY,
        "customerId" integer NOT NULL,
        "startTime" TIMESTAMP NOT NULL,
        "endTime" TIMESTAMP,
        "isOpen" boolean NOT NULL DEFAULT true
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "Message" (
        "messageId" SERIAL PRIMARY KEY,
        "chatId" integer NOT NULL,
        "content" text NOT NULL,
        "senderId" integer NOT NULL,
        "createdAt" TIMESTAMP NOT NULL
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "User" (
        "userId" SERIAL PRIMARY KEY,
        "username" character varying NOT NULL,
        "password" character varying NOT NULL,
        "email" character varying NOT NULL
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "Guide" (
        "guideId" SERIAL PRIMARY KEY,
        "title" character varying NOT NULL,
        "contentHTML" text NOT NULL,
        "creatorId" integer NOT NULL,
        "createdAt" TIMESTAMP NOT NULL
      )`,
    );

    await queryRunner.query(
      `ALTER TABLE "Message" ADD CONSTRAINT "FK_4c3b7d8f7b0e4d9e7b0a2f5b3b1" FOREIGN KEY ("chatId") REFERENCES "Chat"("chatId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "Message" ADD CONSTRAINT "FK_3a2c4d7f8f3e5f3b1b0a2f5b3b1" FOREIGN KEY ("senderId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "Guide" ADD CONSTRAINT "FK_3a2c4d7f8f3e5f3b1b0a2f5b3b1" FOREIGN KEY ("creatorId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
