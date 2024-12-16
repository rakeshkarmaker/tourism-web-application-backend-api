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

@Module({
  imports: [
    TypeOrmModule.forFeature([LOGIN_INFO, USER_INFO, AGENCY_INFO, BOOKING_INFO, PACKAGE_INFO, TRANSPORT_INFO, DESTINATION_INFO, REVIEW_INFO, PAYMENT_INFO]), //npm add @nestjs/typeorm typeorm pg
     TypeOrmModule.forRoot(  // Connecting POSTGRE SQL to NESTJS
     {
         type: 'postgres',
         host: 'localhost',
         port: 5432,
         username: 'postgres',
         password: 'root',
         database: 'TOURISM_DATABASE',
         entities: [
             __dirname + '/../**/*.entity{.ts,.js}',
         ],
         synchronize: true,
       }
   ),
   
 ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
