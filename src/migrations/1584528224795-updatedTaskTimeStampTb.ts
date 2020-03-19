import {MigrationInterface, QueryRunner} from "typeorm";

export class updatedTaskTimeStampTb1584528224795 implements MigrationInterface {
    name = 'updatedTaskTimeStampTb1584528224795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_time_stamp" DROP CONSTRAINT "FK_b2840b534d7243f80c13e2a5440"`, undefined);
        await queryRunner.query(`ALTER TABLE "task_time_stamp" ALTER COLUMN "task_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "task_time_stamp" DROP CONSTRAINT "REL_b2840b534d7243f80c13e2a544"`, undefined);
        await queryRunner.query(`ALTER TABLE "task_time_stamp" DROP COLUMN "EndDateTime"`, undefined);
        await queryRunner.query(`ALTER TABLE "task_time_stamp" ADD "EndDateTime" TIMESTAMP WITH TIME ZONE`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_time_stamp" DROP COLUMN "EndDateTime"`, undefined);
        await queryRunner.query(`ALTER TABLE "task_time_stamp" ADD "EndDateTime" TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "task_time_stamp" ADD CONSTRAINT "REL_b2840b534d7243f80c13e2a544" UNIQUE ("task_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "task_time_stamp" ALTER COLUMN "task_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "task_time_stamp" ADD CONSTRAINT "FK_b2840b534d7243f80c13e2a5440" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
