import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";


export class UpdateProfileImageDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    profileImageKey: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    profileImageUrl: string;
}
