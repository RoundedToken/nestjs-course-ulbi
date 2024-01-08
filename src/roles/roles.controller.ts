import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @ApiOperation({ summary: 'Создание новой роли' })
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto);
    }

    @ApiOperation({ summary: 'Получение роли' })
    @ApiResponse({ status: 200, type: Role })
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.rolesService.getRoleByValue(value);
    }

    @ApiOperation({ summary: 'Получение всех ролей' })
    @ApiResponse({ status: 200, type: [Role] })
    @Get()
    getAll() {
        return this.rolesService.getAllRoles();
    }
}
