import {Body, Controller, Delete, Get, Post} from '@nestjs/common';
import {ProfileService} from "../services/profile.service";
import {AuthenticatedUser, IAuthUser} from "../../auth/decorators/authanticated-user";
import {ConfirmUploadDto, UploadUrlRequestDto} from "../dtos";

@Controller('profile')
export class ProfileController {

    constructor(
        private readonly profileService: ProfileService
    ) {
    }

    @Get('me')
    async getProfile(@AuthenticatedUser() user: IAuthUser){
        return await this.profileService.getProfile(user.id);
    }

    @Post('image/upload/url')
    async getUploadUrl(@AuthenticatedUser() user: IAuthUser, @Body() payload: UploadUrlRequestDto){
        return await this.profileService.getUploadUrl(user, payload);
    }

    @Post('image/confirm/upload')
    async confirmUpload(@AuthenticatedUser() user: IAuthUser, @Body() payload: ConfirmUploadDto){
        return await this.profileService.confirmUpload(user, payload);
    }

    @Delete('image')
    async deleteProfileImage(@AuthenticatedUser() user: IAuthUser){
        return await this.profileService.deleteProfileImage(user.id);
    }


}
