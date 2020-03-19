import { Injectable, UnauthorizedException, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeRepository } from './employee.repository';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Employee } from '../models/employee.entity';
import { UpdateResult } from 'typeorm';
import { CreatePasswordDTO } from './dto/create-password.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { EmployeeStatus } from './employee-status.enum';

@Injectable()
export class EmployeesService {
   // @Inject('MailerProvider') private readonly mailerProvider
    constructor(
        @InjectRepository(EmployeeRepository)
        private employeeRepository: EmployeeRepository,
        private jwtService : JwtService,
        private readonly mailerService: MailerService
        ) {}

    async getEmployees(): Promise<Employee[]> {
        return this.employeeRepository.getEmployees();
        }

    async getAssignableEmployees(): Promise<Employee[]> {
        return this.employeeRepository.assignableEmloyees();
        }    

    async getEmployeeById(employeeId: number): Promise<any> {
        const user = await this.employeeRepository.findOne(employeeId);

        if (!user) {
            throw new HttpException('No employee with the given id was found', HttpStatus.NOT_FOUND);
        }

        return user.toResponseObject();

    }    
         

    async addEmployee(createEmployeeDTO: CreateEmployeeDTO): Promise<void> {
        return this.employeeRepository.addEmployee(createEmployeeDTO);
    }

    public async setAvatar(userId: number, avatarUrl: string){
        this.employeeRepository.update(userId, {avatar: avatarUrl});
    }

    async updateEmployee(id: number, createEmployeeDTO: CreateEmployeeDTO): Promise<UpdateResult> {
        return await this.employeeRepository.updateEmployee(id, createEmployeeDTO);
    }

    async createPassword(id: number, createPasswordDTO: CreatePasswordDTO): Promise<any> {
        const result = await this.employeeRepository.updateUserPassword(id, createPasswordDTO);

        return result;
    }  

    async changePassword(id: number, changePasswordDTO: ChangePasswordDTO): Promise<any> {
         const result = await this.employeeRepository.changePassword(id, changePasswordDTO);
         if (result.affected === 0){
             throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
         }

        return result;
    }  

    async login(authCredentialsDto: AuthCredentialsDto): Promise<any> {
        const employee = await this.employeeRepository.validateUserPassword(authCredentialsDto);
 
        if (!employee) {
            throw new HttpException('Invalid user credentials', HttpStatus.UNAUTHORIZED);
        }
        const payload = employee;
        const accessToken = await this.jwtService.sign(payload);

        return {
            result:{
                access_token: accessToken,
                user_id: employee.userId,
                role: employee.jobTitle,
                },
            status: 200,
            message: "success"
          };
     }

    async updateStatus(id: number, status: EmployeeStatus) {
        return this.employeeRepository.updateStatus(id, status);
    }

    async sendEmail(email: string): Promise<void> {

       const sent = await this
        .mailerService
        .sendMail({
          to: email, // list of receivers
          from: 'support@turyde.com', // sender address
          subject: 'Testing Nest MailerModule ✔', // Subject line
          text: 'TuRyde Support', // plaintext body
          html: '<b>welcome</b>', // HTML body content
        })
        .then((success) => {
            console.log(success)
          })
          .catch((err) => {
            console.log(err)
          });

    }
}
