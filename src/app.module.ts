import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {PostgresqlModule} from "./core/modules/database/postgresql/postgresql.module";
import {UserModule} from "./modules/user/user.module";
import {AuthModule} from "./modules/auth/auth.module";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./modules/auth/guards/jwt-auth.guard";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        PostgresqlModule,
        UserModule,
        AuthModule
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
