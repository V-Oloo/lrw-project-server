import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { static as expose } from 'express';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const hostDomain = AppModule.isDev ? `${AppModule.host}:${AppModule.port}` : AppModule.host;
  app.use(expose('avatars'));
  app.enableCors();
  const swaggerOptions = new DocumentBuilder()
        .setTitle('LRW TRAFFIC SYSTEMS')
        .setDescription('API DOCUMENTATION')
        .setVersion('1.0.0')
        .build();

    const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);
    
    app.use('api/docs/swagger.json', (req, res, next) => {
      res.send(swaggerDoc);
      res.header("Access-Control-Allow-Origin", `${hostDomain}`);
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    SwaggerModule.setup('/api/docs', app, null, {
       swaggerUrl: `${hostDomain}/api/docs/swagger.json`,
       explorer: true,
       swaggerOptions: {
         docExpansion: 'list',
         filter: true,
         showRequestDuration: true
       }
    });

    app.setGlobalPrefix('api');

  await app.listen(AppModule.port);
}
bootstrap();
