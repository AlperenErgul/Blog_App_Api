import {Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {PostService} from "../services/post.service";
import {AuthenticatedUser, IAuthUser} from "../../auth/decorators/authanticated-user";

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
    async findOne(@Param("id") id: string) {
        return await this.postService.findOne(id);
    }

    @Post()
    async create(@AuthenticatedUser() user: IAuthUser, @Param("id") id: string) {
        return await this.postService.create();
    }

    @Patch(':id')
    async update(@AuthenticatedUser() user: IAuthUser, @Param("id") id: string) {
        return await this.postService.update();
    }

    @Delete(':id')
    async delete(@AuthenticatedUser() user: IAuthUser, @Param("id") id: string) {
        return await this.postService.delete()
    }

}
