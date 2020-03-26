import { Employee } from './../models/employee.entity';
import { SmtpConfig } from './../models/smtp_config.entity';
import { Company } from './../models/company.entity';
import * as bcrypt from 'bcrypt';

import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import { AuthModuleOptions } from '@nestjs/passport';

export class companySeed1585248934301 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        // create a company
        const company = getRepository(Company).create({
          organization: 'LRW TRAFFIC SYSTEMS',
          contact_person: 'LRW ADMIN',
          phone: '(123)-123-1234',
          email: 'support@lrw.org',
          address: '123 Test Street,Boston,BO 12345',
          cone_rate: 100.00,
          flagger_rate: 100.00,
          sign_rate: 100.00,
          boards_rate: 100.00,
          min_hours: '4', 
        });
    
        await getRepository(Company).save(company);
    
        // create smtp config
        const config = getRepository(SmtpConfig).create({
          port: '3000',
          username: 'Admin',
          password: 'admin@admin.com',
          host: 'localhost'
        });

        await getRepository(SmtpConfig).save(config);
    
        // create a comment
        const salt = await bcrypt.genSalt();
        const password = 'admin@123'
        const pass = await this.hashPassword(password,salt);

        const emp = getRepository(Employee).create({
          firstname: 'LRW',
          lastname: 'ADMIN',
          email: 'lrw@admin.com',
          phonePrefix: '+1',
          phone: '(123)-123-1234',
          street: '777 Test Street',
          city: 'Boston',
          state: 'BO',
          zipCode: '12345',
          password: pass,
          salt: salt,
          jobTitle: 'ADMIN',
          status: 'ACTIVE',
          avatar: 'asdfghjk',
          createdBy: 'ADMIN'
        });
    
        await getRepository(Employee).save(emp);
    }       

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

    private async hashPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password,salt);
    }

}

