import {Module} from '@nestjs/common';
import {AuthController} from "./controllers/auth.controller";
import {AuthService} from "./services/auth.service";
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../../core/modules/database/entities/user.entity";

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' },
        }),
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports:[AuthService]
})
export class AuthModule {
}
