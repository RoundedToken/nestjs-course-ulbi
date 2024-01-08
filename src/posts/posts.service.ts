import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post) private postsRepository: typeof Post,
        private fileService: FilesService
    ) {}

    async createPost(dto: CreatePostDto, image: any) {
        const imageName = await this.fileService.createFile(image);
        const post = await this.postsRepository.create({ ...dto, image: imageName });

        return post;
    }
}
