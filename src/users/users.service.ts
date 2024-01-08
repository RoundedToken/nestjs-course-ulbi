import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private usersRepository: typeof User,
        private roleService: RolesService
    ) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.usersRepository.create(dto);
        const role = await this.roleService.getRoleByValue('USER');

        await user.$set('roles', [role.id]);
        user.roles = [role];

        return user;
    }

    async getAllUsers() {
        const users = await this.usersRepository.findAll({ include: { all: true } });

        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.usersRepository.findOne({
            where: { email },
            include: { all: true },
        });

        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.usersRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);

        if (!user || !role) {
            throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
        }

        await user.$add('roles', role);

        return dto;
    }

    async banUser(dto: BanUserDto) {
        const user = await this.usersRepository.findByPk(dto.userId);

        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }

        user.banned = true;
        user.bunReason = dto.banReason;
        await user.save();

        return user;
    }
}
