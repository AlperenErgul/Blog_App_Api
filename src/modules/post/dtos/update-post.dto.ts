import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString, MaxLength, MinLength} from "class-validator";


export class UpdatePostDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(100)
    @MinLength(1)
    title?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(500)
    @MinLength(1)
    content?: string;
}
