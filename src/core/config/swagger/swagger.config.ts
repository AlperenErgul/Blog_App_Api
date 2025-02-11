import {DocumentBuilder} from "@nestjs/swagger";


export const swaggerConfig = new DocumentBuilder()
    .setTitle('BLOG APP API')
    .setDescription('API for Blog App')
    .setVersion('1.0.0')
    .addBearerAuth(
    {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    },
    'JWT-AUTH', // This name here is important for matching up with @ApiBearerAuth() in your controller!
)
    .addSecurityRequirements('JWT-AUTH')
    .build()


