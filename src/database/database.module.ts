import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Importing All the Entities
import { USER_INFO } from './entities/user_info.entity';
import { LOGIN_INFO } from './entities/login_info.entity';
import { AGENCY_INFO } from './entities/agency_info.entity';
import { BOOKING_INFO } from './entities/booking_info.entity';
import { PACKAGE_INFO } from './entities/package_info.entity';
import { TRANSPORT_INFO } from './entities/transport_info.entity';
import { PAYMENT_INFO } from './entities/payment_info.entity';
import { DESTINATION_INFO } from './entities/destination_info.entity';
import { REVIEW_INFO } from './entities/review_info.entity';
import { MESSAGE } from './entities/message.entity';//// DB required for the Tour Guide Admin dashboard
import { NOTIFICATION } from './entities/notification.entity';
import { TOUR_POST } from './entities/tour_post.entity';
import { TRANSACTION } from './entities/income.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LOGIN_INFO,
      AGENCY_INFO,
      BOOKING_INFO,
      PACKAGE_INFO,
      TRANSPORT_INFO,
      DESTINATION_INFO,
      USER_INFO, // DB required for the Tour Guide Admin dashboard
      REVIEW_INFO,
      PAYMENT_INFO,
      MESSAGE,
      NOTIFICATION,
      TOUR_POST,
      TRANSACTION
    ]), //npm add @nestjs/typeorm typeorm pg
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
  exports: [TypeOrmModule], //v1.4.2- Exporting the TypeOrmModule to other modules so other modules can now use this
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
