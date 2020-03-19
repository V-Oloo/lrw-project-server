import {MigrationInterface, QueryRunner} from "typeorm";

export class changeTaskIdTotaskId1584294404817 implements MigrationInterface {
    name = 'changeTaskIdTotaskId1584294404817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_9fc19c95c33ef4d97d09b72ee95"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "taskId" TO "task_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_91256732111f039be6b212d96cd" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_91256732111f039be6b212d96cd"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "task_id" TO "taskId"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_9fc19c95c33ef4d97d09b72ee95" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
