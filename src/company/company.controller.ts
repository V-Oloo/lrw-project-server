import { Controller, Get,ParseIntPipe, Param, Patch, Body } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from '../models/company.entity';
import { CreateCompanyDTO } from './dto/create-company.dto';


@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) {}

    @Get('/:id')
    getCompanyById(@Param('id', ParseIntPipe) id: number): Promise<Company> {
      return this.companyService.getCompanyById(id);
    }

    @Patch('/:id/update')
    updateCompany(@Param('id') id: number, @Body() createCompanyDTO: CreateCompanyDTO): Promise<any> {
      return this.companyService.updateCompany(id, createCompanyDTO)
    }
}
