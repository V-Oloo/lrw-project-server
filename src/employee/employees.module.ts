import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../models/employee.entity';
import { EmployeeRepository } from './employee.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStartegy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'topSecret#51',
      signOptions: {
        expiresIn: '7d',
      },
    }),
    TypeOrmModule.forFeature([Employee,EmployeeRepository]),
  ],
  controllers: [EmployeesController],
  providers: [
    EmployeesService,
    JwtStartegy
  ],
  exports: [
    JwtStartegy,
    PassportModule
  ]
})
export class EmployeesModule {}
