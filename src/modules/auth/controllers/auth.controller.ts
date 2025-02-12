import {Body, Controller, Get, Post, UseGuards, Request} from '@nestjs/common';
import {AuthService} from "../services/auth.service";
import {LoginDto} from "../dtos/login.dto";
import {RegisterDto} from "../dtos/register.dto";
import {ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {Public} from "../../../core/decorators/public.decorator";
import {AuthenticatedUser, IAuthUser} from "../decorators/authanticated-user";

@Controller('auth')
@ApiTags('Authantication')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {
    }

    @Public()
    @Post('login')
    async login(@Body() payload: LoginDto): Promise<string> {
        return await this.authService.login(payload);
    }

    @Public()
    @Post('register')
    async register(@Body() payload: RegisterDto): Promise<RegisterDto> {
        return await this.authService.register(payload);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Get('session')
    async session(@AuthenticatedUser() user: IAuthUser) {
        return await this.authService.session(user.id);
    }

}
