import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";


export class UploadUrlRequestDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fileType: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fileSize: number;
}
