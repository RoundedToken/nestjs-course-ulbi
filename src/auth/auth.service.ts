import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);

        return this.generateToken(user);
    }

    async registration({ email, password }: CreateUserDto) {
        const candidate = await this.usersService.getUserByEmail(email);

        if (candidate) {
            throw new HttpException(
                'Пользователь с таким email уже существует',
                HttpStatus.BAD_REQUEST
            );
        }

        const hash = await bcrypt.hash(password, 5);
        const user = await this.usersService.createUser({ email, password: hash });

        return this.generateToken(user);
    }

    private async generateToken({ email, roles, id }: User) {
        return { token: this.jwtService.sign({ email, roles, id }) };
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.usersService.getUserByEmail(userDto.email);
        const isPasswordsEquals = await bcrypt.compare(userDto.password, user.password);

        if (isPasswordsEquals && user) {
            return user;
        }

        throw new UnauthorizedException({ message: 'Некорректный email или пароль' });
    }
}
