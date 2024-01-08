import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор пользователя' })
    readonly userId: number;

    @ApiProperty({ example: 'Хулиганство', description: 'Причина блокировки' })
    readonly banReason: string;
}
