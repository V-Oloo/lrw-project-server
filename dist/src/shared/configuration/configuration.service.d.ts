import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export declare class ConfigurationService {
    private env;
    constructor(env: {
        [k: string]: string | undefined;
    });
    private getValue;
    ensureValues(keys: string[]): this;
    getPort(): string;
    isProduction(): boolean;
    getTypeOrmConfig(): TypeOrmModuleOptions;
}
declare const configurationService: ConfigurationService;
export { configurationService };
