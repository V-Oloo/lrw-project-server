import { EmployeeStatusValidationPipe } from './pipes/employee-status-validation';
import { 
    Controller, Post, Body, UsePipes,
     ValidationPipe, Get, ParseIntPipe, 
     Param, Patch, UseGuards, UseInterceptors, 
     UploadedFile } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";     
import { EmployeesService } from './employees.service';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Employee } from '../models/employee.entity';
import { CreatePasswordDTO } from './dto/create-password.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { EmployeeStatus } from './employee-status.enum';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ResetPasswordDTO } from './dto/reset-password.dto';


@Controller('employees')
export class EmployeesController {
    constructor(private employeeService: EmployeesService) {}

    SERVER_URL: string = "http://localhost:3000/api";

    @Post('/addEmployee')
    // @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    addEmployee(
        @Body() createEmployeeDTO: CreateEmployeeDTO,
        ): Promise<void> {
        return this.employeeService.addEmployee(createEmployeeDTO)

    }

    @Patch('/:id/createPassword')
    @UsePipes(ValidationPipe)
    createPassword(@Param('id',  ParseIntPipe) id, @Body() createPasswordDTO: CreatePasswordDTO) {
       return this.employeeService.createPassword(id, createPasswordDTO)
    }

    @Get()
    //@UseGuards(AuthGuard())
    getEmployees(): Promise<Employee[]> {
        return this.employeeService.getEmployees()
    }

    @Get('/technicians/assignable')
    //@UseGuards(AuthGuard())
    getAsygnableEmployees(): Promise<any> {
        return this.employeeService.getAssignableEmployees()
    }

    @Get('/:id')
    // @UseGuards(AuthGuard())
    getEmployee(@Param('id', ParseIntPipe) employeeId: number): Promise<Employee> {
        return this.employeeService.getEmployeeById(employeeId);
    }

    @Patch(':id/update')
    @UseGuards(AuthGuard())
    async update(@Param('id') id, @Body() createEmployeeDTO: CreateEmployeeDTO): Promise<any> {
        return this.employeeService.updateEmployee(id, createEmployeeDTO);
    }  


    @Post('/login')
    login(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<any>{
        return this.employeeService.login(authCredentialsDto)
    }

    @Post('/genpasswordreset')
    resetPassword(@Body(ValidationPipe) resetPasswordDTO: ResetPasswordDTO): Promise<any>{
        return this.employeeService.resetPassword(resetPasswordDTO);
    }

    @Patch('/:userId/changePassword')
    changePassword(@Param('userId',  ParseIntPipe) id, @Body() changePasswordDTO: ChangePasswordDTO) {
        return this.employeeService.changePassword(id, changePasswordDTO);
    }

   @Patch('/:id/status')
   updateEmployeeStatus(
       @Param('id', ParseIntPipe) id: number, 
       @Body('status',EmployeeStatusValidationPipe ) status:EmployeeStatus ) {
       
        return this.employeeService.updateStatus(id, status);
   }

   @Post('/:userid/avatar')
    @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: './avatars',

        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }
  )
  )
  uploadAvatar(@Param('userid') userId, @UploadedFile() file) {

    this.employeeService.setAvatar(Number(userId), `${this.SERVER_URL}/${file.path}`);

  }
    
}
