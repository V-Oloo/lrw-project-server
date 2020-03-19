import {MigrationInterface, QueryRunner} from "typeorm";

export class addedAssEmpTb1584193751537 implements MigrationInterface {
    name = 'addedAssEmpTb1584193751537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "assigned_employees" ("id" SERIAL NOT NULL, "emp_id" integer NOT NULL, "task_id" integer, CONSTRAINT "PK_e3db1ef5acffe4fd75803409f5a" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "file" ("id" SERIAL NOT NULL, "original_name" character varying(50) NOT NULL, "current_name" character varying(50) NOT NULL, "extention" character varying(50) NOT NULL, "size" integer NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastUpdatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "emp_id" integer, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "assigned_employees" ADD CONSTRAINT "FK_3b6f1f5710ff598eaff4dcedccc" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_9630cdf35ba5b88b27afa58d5a9" FOREIGN KEY ("emp_id") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_9630cdf35ba5b88b27afa58d5a9"`, undefined);
        await queryRunner.query(`ALTER TABLE "assigned_employees" DROP CONSTRAINT "FK_3b6f1f5710ff598eaff4dcedccc"`, undefined);
        await queryRunner.query(`DROP TABLE "file"`, undefined);
        await queryRunner.query(`DROP TABLE "assigned_employees"`, undefined);
    }

}
