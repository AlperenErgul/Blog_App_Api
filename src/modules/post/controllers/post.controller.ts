import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {PostService} from "../services/post.service";
import {AuthenticatedUser, IAuthUser} from "../../auth/decorators/authanticated-user";
import {CreatePostDto, UpdatePostDto} from "../dtos";
import {AuthenticationGuard} from "../../auth/guards/authantication.guard";
import {ApiPaginationQuery, Paginate, PaginateQuery} from "nestjs-paginate";
import {POST_PAGINATION_CONFIG} from "../paginate-config/post-pagination.config";


@ApiTags('Post')
@AuthenticationGuard()
@Controller('post')
export class PostController {

    constructor(
        private readonly postService: PostService
    ) {
    }


    @Get()
    @ApiPaginationQuery(POST_PAGINATION_CONFIG)
    async findAll(
        @Paginate() query:PaginateQuery
    ) {
        return await this.postService.findAll(query);
    }

    @Get(':postId')
    async findOne(@Param("postId") postId: string) {
        return await this.postService.findOne(postId);
    }

    @Post()
    async create(@AuthenticatedUser() user: IAuthUser, @Body() payload: CreatePostDto) {
        return await this.postService.create(user.id, payload);
    }

    @Patch(':postId')
    async update(@AuthenticatedUser() user: IAuthUser, @Param("postId") postId: string, @Body() payload: UpdatePostDto) {
        return await this.postService.update(user.id, postId, payload);
    }

    @Delete(':postId')
    async delete(@AuthenticatedUser() user: IAuthUser, @Param("postId") postId: string) {
        return await this.postService.delete(user.id, postId);
    }

}
