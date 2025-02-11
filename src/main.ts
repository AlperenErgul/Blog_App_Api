import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ConfigService} from "@nestjs/config";
import {SwaggerModule} from "@nestjs/swagger";
import {swaggerConfig} from "./core/config/swagger/swagger.config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService: ConfigService = app.get(ConfigService);

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, swaggerDocument);

    const port = configService.get('PORT') || 3000;
    await app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}

bootstrap();
