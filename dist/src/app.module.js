"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employees_module_1 = require("./employee/employees.module");
const company_module_1 = require("./company/company.module");
const comments_module_1 = require("./comments/comments.module");
const customer_module_1 = require("./customer/customer.module");
const project_module_1 = require("./project/project.module");
const tasks_module_1 = require("./tasks/tasks.module");
const shared_module_1 = require("./shared/shared.module");
const ormconfig = require("./ormconfig");
function DatabaseOrmModule() {
    return typeorm_1.TypeOrmModule.forRoot(ormconfig);
}
exports.DatabaseOrmModule = DatabaseOrmModule;
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forRoot(ormconfig), employees_module_1.EmployeesModule, company_module_1.CompanyModule, comments_module_1.CommentsModule, customer_module_1.CustomerModule, project_module_1.ProjectModule, tasks_module_1.TasksModule, shared_module_1.SharedModule],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map