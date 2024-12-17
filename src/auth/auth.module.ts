import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LOGIN_INFO } from '../database/entities/login_info.entity';
import { USER_INFO } from '../database/entities/user_info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LOGIN_INFO, USER_INFO]), // Register the entities
    TypeOrmModule.forRoot(
      // Connecting POSTGRE SQL to NESTJS
      {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'TOURISM_DATABASE',
        entities: [__dirname + '/../database/entities/*.entity.{js,ts}'],
        autoLoadEntities: true, // Enable automatic entity loading
        synchronize: true,
      },
    ),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
