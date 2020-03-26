import { Company } from './../models/company.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompanyDTO } from './dto/create-company.dto';
//import { Company } from './company.entity

@Injectable()
export class CompanyService {

    constructor( @InjectRepository(CompanyRepository) private companyRepository: CompanyRepository) {}

    async getCompanyById(id: number): Promise<Company> {
      const found = await this.companyRepository.findOne(id);

      if (!found) {
              throw new NotFoundException('Company not found');
          }
    
          return found
    }

    async updateCompany(id: number, createCompanyDTO: CreateCompanyDTO): Promise<any> {
         return this.companyRepository.updateCompany(id, createCompanyDTO)
    }

}
