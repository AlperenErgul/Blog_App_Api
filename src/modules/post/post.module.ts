import {Module} from '@nestjs/common';
import {PostService} from "./services/post.service";
import {PostController} from "./controllers/post.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PostEntity} from "../../core/modules/database/entities/post.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([PostEntity])
    ],
    controllers: [PostController],
    providers: [PostService]
})
export class PostModule {
}
