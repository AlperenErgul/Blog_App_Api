import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {IAuthUser} from "../../auth/decorators/authanticated-user";
import {ConfirmUploadDto, UploadUrlRequestDto} from "../dtos";
import {S3Service} from "../../../core/modules/s3/services";
import {UserService} from "../../user/services/user.service";

@Injectable()
export class ProfileService {

    constructor(
        private readonly s3Service: S3Service,
        private readonly userService: UserService
    ) {
    }

    async getUploadUrl(user: IAuthUser, payload: UploadUrlRequestDto) {
        const {fileType, fileSize} = payload;

        if (!this.s3Service.isValidImageType(fileType)) {
            throw new BadRequestException('Invalid file type. Only images allowed.');
        }

        if (!this.s3Service.isValidFileSize(fileSize)) {
            throw new BadRequestException('File size too large. Max 5MB allowed.');
        }

        try {
            const result = await this.s3Service.getUploadPresignedUrl(user.id, fileType, fileSize);

            return {
                success: true,
                data: result,
                message: 'Upload Url generated successfully'
            }
        } catch (error) {
            throw new BadRequestException('Failed to generate upload URL');
        }
    }

    async confirmUpload(requestedUser: IAuthUser, payload: ConfirmUploadDto) {
        const {key, viewUrl} = payload;

        try {
            const user = await this.userService.findOneByPk(requestedUser.id);
            if (user.profileImageKey) {
                await this.s3Service.deleteFile(user.profileImageKey);
            }

            await this.userService.updateProfileImage(user.id, key, viewUrl);

            return {
                success: true,
                data: {
                    profileImageUrl: viewUrl
                },
                message: 'Profile image updated successfully'
            }
        } catch (error) {
            throw new BadRequestException('Failed to update profile image');
        }
    }

    async deleteProfileImage(userId: string): Promise<boolean> {
        try {
            const user = await this.userService.findOneByPk(userId);

            if (!user.profileImageKey) {
                throw new NotFoundException('No profile image found');
            }

            await this.s3Service.deleteFile(user.profileImageKey);

            await this.userService.deleteProfileImage(userId);

            return true;
        } catch (error) {
            throw new BadRequestException('Failed to delete profile image');
        }
    }

    async getProfile(userId: string){
        try {
            const user = await this.userService.findOneByPk(userId);

            return {
                success: true,
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    profileImageUrl: user.getProfileImageUrl(),
                    hasProfileImage: user.hasProfileImage(),
                },
            };
        }catch (error){
            throw new NotFoundException('User not found');
        }
    }

}
