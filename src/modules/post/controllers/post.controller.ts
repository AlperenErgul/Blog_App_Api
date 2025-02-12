import {Controller, Delete, Get, Patch, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {PostService} from "../services/post.service";

@Controller('post')
@ApiTags('Post')
export class PostController {

    constructor(
        private readonly postService: PostService
    ) {
    }

    @Get()
    async findAll() {
        return await this.postService.findAll();
    }

    @Get(':id')
    async findOne() {
        return await this.postService.findOne();
    }

    @Post()
    async create() {
        return await this.postService.create();
    }

    @Patch(':id')
    async update() {
        return await this.postService.update();
    }

    @Delete(':id')
    async delete() {
        return await this.postService.delete()
    }

}
