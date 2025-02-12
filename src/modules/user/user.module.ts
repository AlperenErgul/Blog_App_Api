import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../../core/modules/database/entities/user.entity";
import {UserController} from "./controllers/user.controller";
import {UserService} from "./services/user.service";
import {PostEntity} from "../../core/modules/database/entities/post.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, PostEntity])
    ],
    controllers: [UserController],
    providers: [
        UserService
    ],
    exports: [UserService]
})
export class UserModule {
}
