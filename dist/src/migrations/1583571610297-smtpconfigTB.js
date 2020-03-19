"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class smtpconfigTB1583571610297 {
    constructor() {
        this.name = 'smtpconfigTB1583571610297';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "smtp_config" ("id" SERIAL NOT NULL, "host" character varying NOT NULL, "port" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_ae1ade2582b94de6ba053248412" PRIMARY KEY ("id"))`, undefined);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "smtp_config"`, undefined);
    }
}
exports.smtpconfigTB1583571610297 = smtpconfigTB1583571610297;
//# sourceMappingURL=1583571610297-smtpconfigTB.js.map