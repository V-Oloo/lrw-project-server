import {MigrationInterface, QueryRunner} from "typeorm";

export class cancelledTasksTb1584534878743 implements MigrationInterface {
    name = 'cancelledTasksTb1584534878743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cancelled_tasks" ("id" SERIAL NOT NULL, "task_id" integer NOT NULL, "reason" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_de4cdbb0708f91fa76ac932d2ee" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cancelled_tasks"`, undefined);
    }

}
