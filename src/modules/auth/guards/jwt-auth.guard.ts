import {ExecutionContext, Injectable} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY} from "../../../core/decorators/public.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(private reflector: Reflector) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // @Public() olan endpoint’leri kontrol et
        const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());

        if (isPublic) {
            return true; // Eğer public ise, JWT doğrulamasını geç
        }

        return (await super.canActivate(context)) as boolean; // Hata almamak için sonucu Promise olarak bekle
    }

}
