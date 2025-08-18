import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {PostgresqlModule} from "./core/modules/database/postgresql/postgresql.module";
import {UserModule} from "./modules/user/user.module";
import {AuthModule} from "./modules/auth/auth.module";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./modules/auth/guards/jwt-auth.guard";
import {PostModule} from "./modules/post/post.module";
import {S3Module} from "./core/modules/s3/s3.module";
import {ProfileModule} from "./modules/profile/profile.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env'
        }),
        PostgresqlModule,
        UserModule,
        AuthModule,
        PostModule,
        S3Module,
        ProfileModule
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule {
}
