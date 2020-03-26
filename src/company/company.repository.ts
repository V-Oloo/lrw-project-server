import { Repository, EntityRepository, UpdateResult } from "typeorm";
import { Company } from "../models/company.entity";
import { CreateCompanyDTO } from "./dto/create-company.dto";
import { HttpException, HttpStatus } from "@nestjs/common";


@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {

    async updateCompany(id: number, createCompanyDTO: CreateCompanyDTO): Promise<UpdateResult> {
       const {organization, contact_person, email, address, phone, cone_rate,flagger_rate,sign_rate,boards_rate, min_hours} = createCompanyDTO
       
       const company = await this.findOne(id);

       if(company) {
           const result = this.createQueryBuilder().update()
                          .set({organization: organization, contact_person: contact_person, 
                                email: email, address: address, 
                                phone: phone, cone_rate: cone_rate,
                                flagger_rate: flagger_rate, sign_rate: sign_rate, boards_rate: boards_rate,
                                min_hours: min_hours
                               })
                          .where("id = :id", {id:id}).execute();

           return result;       
       }else {
           throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
       }
    }


}