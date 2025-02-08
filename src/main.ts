import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors'; // Importing CORS using ES module syntax

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
