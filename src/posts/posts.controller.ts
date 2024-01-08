import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Посты')
@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Post()
    @ApiOperation({ summary: 'Создание поста' })
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
        return this.postsService.createPost(dto, image);
    }
}
