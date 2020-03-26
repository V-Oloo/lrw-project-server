import { NotificationStatus } from './notification-status.enum';
import { NotificationDto } from './dto/notification.dto';
import { Notification } from './../models/notification.entity';
import { Repository, EntityRepository, UpdateResult, getRepository, getConnection} from "typeorm";
import * as bcrypt from 'bcrypt';
import { CreateEmployeeDTO } from "./dto/create-employee.dto";
import { ConflictException, InternalServerErrorException, HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { CreatePasswordDTO } from "./dto/create-password.dto";
import { ChangePasswordDTO } from "./dto/change-password.dto";
import { Employee } from "../models/employee.entity";
import * as generator from 'generate-password'
import { EmployeeStatus } from "./employee-status.enum";
import { sendEmail } from "../utils/sendEmail";
import { confirmEmailLink } from "../utils/confirmEmailLink";


@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {

    async getEmployees(): Promise<Employee[]> {
        const query = this.createQueryBuilder('emp');

        const employee = await query
        .select(["emp.id", "emp.firstname", "emp.lastname", "emp.phone", "emp.email","emp.street","emp.state","emp.city","emp.zipCode", "emp.jobTitle", "emp.status"])
        .where("emp.status IN (:...status)", { status: [ "ACTIVE", "INACTIVE"] })
        .getMany()

        return employee;
        
    }

    async getUserNotifications(userId: number): Promise<any> {
        const repo = getRepository(Notification).createQueryBuilder('n')

        const notifications = await repo.select('n.*')
                                        .where('n.user = :id',{id : userId})
                                        .orderBy('n.createdAt','DESC')
                                        .getRawMany();

        return notifications;
    }

    async getNotification(id: number): Promise<any> {
        const notification = getRepository(Notification).findOne(id);                        

        return notification;
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

    async addNotification(notificationDto: NotificationDto): Promise<any> {
        const {event, message, status, user} = notificationDto

        await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Notification)
                .values([
                    { event: event, message: message, status: status, user: user }, 
                   
                ])
                .execute();

    }

    async addEmployee(createEmployeeDTO: CreateEmployeeDTO): Promise<void> {
        const {phone, email, firstname, lastname, jobTitle, state, street, zipCode, city, phonePrefix } = createEmployeeDTO; 


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
            employee.state = state;
            employee.city = city;
            employee.street = street;
            employee.zipCode = zipCode; 
            employee.createdBy = "Admin";
            

            try {
               await employee.save();
               await sendEmail(email,await confirmEmailLink(employee.id), password)
            } catch (error) {
                if (error.code === '23505'){
                    throw new ConflictException('email address already exist');
                }else {
                     throw new InternalServerErrorException();
                }
                
            }
        
    }

    async updateEmployee( id: number, createEmployeeDTO: CreateEmployeeDTO): Promise<UpdateResult> {

        const { email,firstname, lastname, jobTitle, phone, phonePrefix, street, zipCode, state, city} = createEmployeeDTO;

        const user = await this.findOne(id);

        if(user) {
            const result = this.createQueryBuilder().update()
                           .set({email: email, firstname: firstname, 
                                 lastname: lastname, jobTitle: jobTitle, 
                                 phone: phone, phonePrefix: phonePrefix,
                                 state: state, city: city, street: street,
                                 zipCode: zipCode
                                })
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

    async updateNotifStatus(id: number, status: NotificationStatus) {

        const notification = getRepository(Notification);
        const found = await notification.findOne(id);

        if (!found) {
            throw new NotFoundException(`Notification not found`);
        }

        const result = notification.createQueryBuilder()
        .update(Notification)
        .set({status: status})
        .where("id = :id", {id: id}).execute();

    }



    private async hashPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password,salt);
    }

}