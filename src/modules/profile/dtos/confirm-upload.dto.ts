import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";


export class ConfirmUploadDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    key: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    viewUrl: string;
}
