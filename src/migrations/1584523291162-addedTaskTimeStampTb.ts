import {MigrationInterface, QueryRunner} from "typeorm";

export class addedTaskTimeStampTb1584523291162 implements MigrationInterface {
    name = 'addedTaskTimeStampTb1584523291162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task_time_stamp" ("id" SERIAL NOT NULL, "StartDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "EndDateTime" TIMESTAMP, "task_id" integer, CONSTRAINT "REL_b2840b534d7243f80c13e2a544" UNIQUE ("task_id"), CONSTRAINT "PK_873860865ef0361f1779bd059d3" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "task_time_stamp" ADD CONSTRAINT "FK_b2840b534d7243f80c13e2a5440" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_time_stamp" DROP CONSTRAINT "FK_b2840b534d7243f80c13e2a5440"`, undefined);
        await queryRunner.query(`DROP TABLE "task_time_stamp"`, undefined);
    }

}
