import {BadRequestException, Injectable} from '@nestjs/common';
import {UserService} from "../../user/services/user.service";
import {RegisterDto} from "../dtos/register.dto";
import * as bcrypt from 'bcrypt';
import {LoginDto} from "../dtos/login.dto";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {UserEntity} from "../../../core/modules/database/entities/user.entity";
import {LoginResponseInterface} from "../interfaces/login-response.interface";

@Injectable()
export class AuthService {

    private readonly TOKEN_EXPIRES_IN = '1h';

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
    }

    async register(payload: RegisterDto): Promise<RegisterDto> {
        const user = await this.userService.findOneByEmail(payload.email);
        if (user) {
            throw new BadRequestException('AccountAlreadyExist', {
                cause: new Error(),
                description: 'There is already an account for this user'
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(payload.password, salt);

        let registeredUser = await this.userService.createUser({
            email: payload.email,
            name: payload.name,
            password: hashedPassword
        });

        return payload;

    }

    async login(payload: LoginDto): Promise<LoginResponseInterface> {
        const user = await this.validateUser(payload.email, payload.password);
        const jwtPayload = {id: user.id, email: user.email};
        const token: string = this.jwtService.sign(jwtPayload, {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: this.TOKEN_EXPIRES_IN
        });

        let response: LoginResponseInterface = {
            "access-token": token,
            user:{
                id: user.id,
                name: user.name,
                email: user.email
            }
        }

        return response;
    }

    async validateUser(email: string, password: string): Promise<UserEntity> {
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            throw new BadRequestException('NoAccountWithThisEmail', {
                cause: new Error(),
                description: 'There is no account with this email'
            })
        }

        const compareResult = await bcrypt.compare(password, user.password);
        if (!compareResult) {
            throw new BadRequestException('EmailOrPasswordIncorrect', {
                cause: new Error(),
                description: 'Email or password incorrect!'
            })
        }

        return user;
    }

    async session(id: string) {
        return await this.userService.findOneByPk(id);
    }


}
