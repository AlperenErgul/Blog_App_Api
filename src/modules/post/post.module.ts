import {Module} from '@nestjs/common';
import {PostService} from "./services/post.service";
import {PostController} from "./controllers/post.controller";

@Module({
    imports: [],
    controllers: [PostController],
    providers: [PostService]
})
export class PostModule {
}
