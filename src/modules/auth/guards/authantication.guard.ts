import { applyDecorators, UseGuards } from '@nestjs/common';
import {JwtAuthGuard} from "./jwt-auth.guard";

export function AuthenticationGuard() {
    return applyDecorators(UseGuards(JwtAuthGuard));
}
