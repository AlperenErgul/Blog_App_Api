import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export interface IAuthUser {
    id: string;
    email: string;
}

export const AuthenticatedUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: IAuthUser = request.user;
    return data ? user && user[data] : user;
});
