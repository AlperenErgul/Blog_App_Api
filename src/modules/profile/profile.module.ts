import { Module } from '@nestjs/common';
import {ProfileController} from "./controllers/profile.controller";
import {ProfileService} from "./services/profile.service";
import {UserModule} from "../user/user.module";
import {S3Module} from "../../core/modules/s3/s3.module";

@Module({
    imports:[
        UserModule,
        S3Module
    ],
    controllers:[
        ProfileController
    ],
    providers:[
        ProfileService
    ]
})
export class ProfileModule {}
