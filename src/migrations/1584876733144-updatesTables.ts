import {MigrationInterface, QueryRunner} from "typeorm";

export class updatesTables1584876733144 implements MigrationInterface {
    name = 'updatesTables1584876733144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "organization" character varying NOT NULL, "contactPerson" character varying NOT NULL, "phonePrefix" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "street" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "zipCode" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'ACTIVE', "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "startDate" date NOT NULL, "endDate" date NOT NULL, "status" character varying NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastUpdatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "customerId" integer, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "review" text NOT NULL, "emp_id" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "task_id" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "plannedStartDate" character varying NOT NULL, "plannedEndDate" character varying NOT NULL, "status" character varying NOT NULL, "street" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "zipCode" character varying NOT NULL, "workStart" TIMESTAMP WITH TIME ZONE, "workEnd" TIMESTAMP WITH TIME ZONE, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "projectId" integer, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "assigned_employees" ("id" SERIAL NOT NULL, "emp_id" integer NOT NULL, "task_id" integer, CONSTRAINT "PK_e3db1ef5acffe4fd75803409f5a" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "employee" ("id" SERIAL NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "phonePrefix" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "street" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "zipCode" character varying NOT NULL, "jobTitle" character varying NOT NULL, "password" character varying, "salt" character varying, "status" character varying DEFAULT 'ACTIVE', "avatar" character varying NOT NULL, "createdBy" character varying(300) NOT NULL, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "UQ_817d1d427138772d47eca048855" UNIQUE ("email"), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_b76640329fa79f0b0e9d031c35b" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_91256732111f039be6b212d96cd" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "assigned_employees" ADD CONSTRAINT "FK_3b6f1f5710ff598eaff4dcedccc" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assigned_employees" DROP CONSTRAINT "FK_3b6f1f5710ff598eaff4dcedccc"`, undefined);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_91256732111f039be6b212d96cd"`, undefined);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_b76640329fa79f0b0e9d031c35b"`, undefined);
        await queryRunner.query(`DROP TABLE "employee"`, undefined);
        await queryRunner.query(`DROP TABLE "assigned_employees"`, undefined);
        await queryRunner.query(`DROP TABLE "task"`, undefined);
        await queryRunner.query(`DROP TABLE "comment"`, undefined);
        await queryRunner.query(`DROP TABLE "project"`, undefined);
        await queryRunner.query(`DROP TABLE "customer"`, undefined);
    }

}
