"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const employees_controller_1 = require("./employees.controller");
const employees_service_1 = require("./employees.service");
const typeorm_1 = require("@nestjs/typeorm");
const employee_entity_1 = require("../models/employee.entity");
const employee_repository_1 = require("./employee.repository");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./jwt.strategy");
let EmployeesModule = class EmployeesModule {
};
EmployeesModule = __decorate([
    common_1.Module({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: 'topSecret#51',
                signOptions: {
                    expiresIn: 3600,
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([employee_entity_1.Employee, employee_repository_1.EmployeeRepository]),
        ],
        controllers: [employees_controller_1.EmployeesController],
        providers: [
            employees_service_1.EmployeesService,
            jwt_strategy_1.JwtStartegy
        ],
        exports: [
            jwt_strategy_1.JwtStartegy,
            passport_1.PassportModule
        ]
    })
], EmployeesModule);
exports.EmployeesModule = EmployeesModule;
//# sourceMappingURL=employees.module.js.map