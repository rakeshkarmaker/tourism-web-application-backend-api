import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module'; //Connecting the Database
// import { TypeOrmModule } from '@nestjs/typeorm';//For  Database connection test entity - CRUD Operation part.

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
