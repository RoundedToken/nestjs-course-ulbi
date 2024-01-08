import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
    @ApiProperty({ example: 'Новый пост', description: 'Заголовок поста' })
    readonly title: string;

    @ApiProperty({ example: 'Привет мир!', description: 'Текст поста' })
    readonly content: string;

    @ApiProperty({ example: '1', description: 'Уникальный идентификатор пользователя' })
    readonly userId: number;
}
