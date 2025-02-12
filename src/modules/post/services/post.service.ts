import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PostEntity} from "../../../core/modules/database/entities/post.entity";
import {Repository} from "typeorm";
import {CreatePostDto, UpdatePostDto} from "../dtos";
import {UserEntity} from "../../../core/modules/database/entities/user.entity";
import {paginate, PaginateQuery} from "nestjs-paginate";
import {POST_PAGINATION_CONFIG} from "../paginate-config/post-pagination.config";

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(PostEntity)
        private readonly postEntity: Repository<PostEntity>
    ) {
    }

    async findOne(postId: string): Promise<PostEntity> {
        const post = await this.postEntity.findOne({
            where: {
                id: postId
            }
        });

        if (!post) {
            throw new NotFoundException('PostNotFound', {
                cause: new Error(),
                description: 'Post Not Found'
            })
        }

        return post;
    }

    async findAll(query: PaginateQuery) {
        return await paginate(query, this.postEntity, {
            ...POST_PAGINATION_CONFIG,
            relations: ['user']
        });
    }

    async create(userId: string, payload: CreatePostDto): Promise<PostEntity> {
        const post = await this.postEntity.create({
            title: payload.title,
            content: payload.content,
            user: {id: userId} as UserEntity
        });

        return await this.postEntity.save(post);
    }

    async update(userId: string, postId: string, payload: UpdatePostDto) {
        const post = await this.postEntity.findOne({
            where:{
                id: postId
            },
            relations: ['user']
        });

        if (!post){
            throw new NotFoundException('PostNotFound', {
                cause: new Error(),
                description: 'Post not found'
            });
        }

        if (post.user.id !== userId) {
            throw new ForbiddenException('PostDoesNotBelongThisUser', {
                cause: new Error(),
                description: 'You can only update your own posts'
            });
        }

        const updatedPost = await this.postEntity.merge(post, payload);

        await this.postEntity.save(updatedPost);

        return  {
            ...updatedPost,
            user: {
                id: updatedPost.user.id,
                email: updatedPost.user.email, // sadece gerekli alanları döndürüyoruz
            },
        };
    }

    async delete(userId: string, postId: string): Promise<Boolean> {
        const post = await this.postEntity.findOne({
            where: {
                id: postId
            },
            relations: ['user']
        })

        if (!post) {
            throw new NotFoundException('PostNotFound', {
                cause: new Error(),
                description: 'Post Not Found'
            })
        }

        if (post.user.id !== userId) {
            throw new ForbiddenException('PostDoesNotBelongThisUser', {
                cause: new Error(),
                description: 'You can only delete your own posts'
            })
        }

        try {
            await this.postEntity.remove(post);

            return true;
        } catch (error) {
            console.error('Error while deleting post:', error);
            return false;
        }
    }


}
