import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class RegisterDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(50)
    password: string;


}
