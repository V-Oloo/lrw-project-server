import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import { SmtpConfigSeed } from "../seeds/smtp_config.seed";

export class SeedSmtpConfig1583571927198 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await getRepository("smtp_config").save(SmtpConfigSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
