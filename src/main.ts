import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 5000;
    const config = new DocumentBuilder()
        .setTitle('Урок по продвинутому бэку')
        .setDescription('Документация REST API')
        .setVersion('1.0')
        .addTag('UlbiTV')
        .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(PORT, () => console.log(`Server started on ${PORT}`));
}

start();
