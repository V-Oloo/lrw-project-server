import { Repository } from "typeorm";
import { Company } from "../models/company.entity";
export declare class CompanyRepository extends Repository<Company> {
    private hashPassword;
}
