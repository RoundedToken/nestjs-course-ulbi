import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @IsString({ message: 'Должно быть строкой' })
    @IsEmail({}, { message: 'Некорректный email' })
    @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
    readonly email: string;

    @IsString({ message: 'Должно быть строкой' })
    @Length(4, 16, { message: 'Не менее 4 и не больше 16' })
    @ApiProperty({ example: '12345', description: 'Пароль' })
    readonly password: string;
}
