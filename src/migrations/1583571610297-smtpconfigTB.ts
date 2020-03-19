import {MigrationInterface, QueryRunner} from "typeorm";

export class smtpconfigTB1583571610297 implements MigrationInterface {
    name = 'smtpconfigTB1583571610297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "smtp_config" ("id" SERIAL NOT NULL, "host" character varying NOT NULL, "port" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_ae1ade2582b94de6ba053248412" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "smtp_config"`, undefined);
    }

}
