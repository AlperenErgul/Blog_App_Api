import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../../../core/modules/database/entities/user.entity";
import {Repository} from "typeorm";
import {RegisterDto} from "../../auth/dtos/register.dto";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntity: Repository<UserEntity>
    ) {
    }

    async findOneByEmail(email: string): Promise<UserEntity | null> {
        return await this.userEntity.findOne({
            where: {
                email: email
            }
        });
    }

    async createUser(payload: RegisterDto): Promise<UserEntity> {
        const user = await this.userEntity.create(payload);
        return await this.userEntity.save(user);
    }

    async findOneByPk(id: string): Promise<UserEntity> {
        const user = await this.userEntity.findOne({
            where: {
                id: id
            },
            select:['id', 'name', 'email']
        })

        if (!user) {
            throw new BadRequestException('UserNotFound', {
                cause: new Error(),
                description: 'User not found'
            })
        }

        return user;
    }

}
