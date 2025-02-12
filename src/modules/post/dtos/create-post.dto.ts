import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class CreatePostDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @MinLength(1)
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    @MinLength(1)
    content: string;
}
