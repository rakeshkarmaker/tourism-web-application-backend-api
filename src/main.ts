import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors'; // Importing CORS using ES module syntax
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';



async function bootstrap() {

  //V3.1.0-Create a new NestExpressApplication instance instead of NestApplication So that we can use files outsite directly
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //useStaticAssets() is not available on INestApplication, but only on NestExpressApplication.

  // Serve static files dynamically
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  
   // To enable cookies with CORS
   app.use(cors({
    origin: 'http://localhost:3002', // Replace with your frontend's URL
    credentials: true,               // Allows sending cookies with the request
  }));
  


  //Applying global pipe so that it validates our every dtos while our route handler whenever we assign them to body or maybe other decorators
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
