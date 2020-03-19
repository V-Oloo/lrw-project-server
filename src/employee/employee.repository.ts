import { Repository, EntityRepository, UpdateResult} from "typeorm";
import * as bcrypt from 'bcrypt';
import { CreateEmployeeDTO } from "./dto/create-employee.dto";
import { ConflictException, InternalServerErrorException, HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { CreatePasswordDTO } from "./dto/create-password.dto";
import { ChangePasswordDTO } from "./dto/change-password.dto";
import { Employee } from "../models/employee.entity";
import * as generator from 'generate-password'
import { EmployeeStatus } from "./employee-status.enum";
// import { sendEmail } from "../utils/sendMail";
// import { ConfirmEmailLink } from "../utils/confirmEmailLinks";


@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {

    async getEmployees(): Promise<Employee[]> {
        const query = this.createQueryBuilder('emp');

        const employee = await query
        .select(["emp.id", "emp.firstname", "emp.lastname", "emp.phone", "emp.email", "emp.address", "emp.jobTitle", "emp.status"])
        .where("emp.status IN (:...status)", { status: [ "ACTIVE", "INACTIVE"] })
        .getMany()

        return employee;
        
    }

    async assignableEmloyees() : Promise<any> {
        const query = this.createQueryBuilder('emp')
                      .select('emp.id', "emp_id")
                      .addSelect("CONCAT(firstname, ' ', lastname)", "name")
                      .where("emp.jobTitle = :jobTitle", {jobTitle : "TECHNICIAN"})
                      .andWhere("emp.status = :status", {status: "ACTIVE"})
                      .getRawMany()

        return query;              
    }

    async addEmployee(createEmployeeDTO: CreateEmployeeDTO): Promise<void> {
        const {phone, email, firstname, lastname, jobTitle, address, phonePrefix } = createEmployeeDTO; 


        const password = generator.generate({
            length: 10,
            numbers: true
           })
        const salt = await bcrypt.genSalt();
        const pass = await this.hashPassword(password,salt);


            const employee = new Employee();
            employee.phonePrefix = phonePrefix;
            employee.phone = phone;
            employee.email = email;
            employee.firstname = firstname;
            employee.lastname = lastname;
            employee.jobTitle = jobTitle;
            employee.salt = salt;
            employee.password = pass;
            employee.address = address;
            employee.createdBy = "Admin";
           

            try {
                console.log(password);
                await employee.save();
                // const id = 10;
                // await sendEmail(email,await ConfirmEmailLink(id))
            } catch (error) {
                if (error.code === '23505'){
                    throw new ConflictException('email address already exist');
                }else {
                     throw new InternalServerErrorException();
                }
                
            }
        
    }

    async updateEmployee( id: number, createEmployeeDTO: CreateEmployeeDTO): Promise<UpdateResult> {

        const { email,firstname, lastname, jobTitle, phone, address, phonePrefix} = createEmployeeDTO;

        const user = await this.findOne(id);

        if(user) {
            const result = this.createQueryBuilder().update()
                           .set({email: email, firstname: firstname, lastname: lastname, jobTitle: jobTitle, phone: phone, phonePrefix: phonePrefix, address: address})
                           .where("id = :id", {id:id}).execute();

            return result;       
        }else {
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        }

                   

    }


    async updateUserPassword (id: number, createPasswordDTO: CreatePasswordDTO): Promise<any> {
        const { password } = createPasswordDTO;

        const salt = await bcrypt.genSalt();
        const pass = await this.hashPassword(password,salt);

        const result = this.createQueryBuilder()
                           .update(Employee)
                           .set({password: pass, salt: salt, status: "ACTIVE"})
                           .where("id = :id", {id: id}).execute();
        
        return result;                   

    }

    async changePassword(id: number, changePasswordDTO: ChangePasswordDTO) {
        const { oldPassword, newPassword } = changePasswordDTO;

        const user = await this.findOne(id);

        if (user) {

            const oldSalt = user.salt;
            const inputPass = await this.hashPassword(oldPassword,oldSalt);

            const oldPass = user.password;

            if (inputPass === oldPass ){

                const salt = await bcrypt.genSalt();
                const pass = await this.hashPassword(newPassword,salt);

                const result = this.createQueryBuilder()
                               .update(Employee)
                               .set({password: pass, salt: salt})
                               .where("id = :id", {id: id}).execute();
    
                return result; 
            }

            throw new HttpException('old password do not match', HttpStatus.NOT_FOUND)
            

        } else {
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
        }
    }


    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<any> {
        const {email, password} = authCredentialsDto;

        const user = await this.findOne({email});


        if (user && await user.validatePassword(password)) {

            const userData = {
                        userId: user.id, 
                        email: user.email,
                        jobTitle: user.jobTitle,

                     };
            return userData;
        } else {
            return null;
        }

    }

    async updateStatus(id: number, status: EmployeeStatus) {
        const employee = await this.findOne(id);
        if (!employee) {
            throw new NotFoundException(`Task not found`);
       }

       employee.status = status;
       employee.save();

    }


    private async hashPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password,salt);
    }

}