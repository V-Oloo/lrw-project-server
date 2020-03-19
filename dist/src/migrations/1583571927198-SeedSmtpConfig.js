"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const smtp_config_seed_1 = require("../seeds/smtp_config.seed");
class SeedSmtpConfig1583571927198 {
    async up(queryRunner) {
        await typeorm_1.getRepository("smtp_config").save(smtp_config_seed_1.SmtpConfigSeed);
    }
    async down(queryRunner) {
    }
}
exports.SeedSmtpConfig1583571927198 = SeedSmtpConfig1583571927198;
//# sourceMappingURL=1583571927198-SeedSmtpConfig.js.map