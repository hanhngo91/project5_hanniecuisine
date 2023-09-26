import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './menu/menu.entity';
import { MenuModule } from './menu/menu.module';
import { ReservationModule } from './reservation/reservation.module';
import { ReservationEntity } from './reservation/reservation.entity';
import { CancellationsModule } from './cancellations/cancellations.module';
import { CancellationEntity } from './cancellations/cancellations.entity';
import { MessageModule } from './message/message.module';
import { MessageEntity } from './message/message.entity';
import { CustomerModule } from './customer/customer.module';
import { CustomerEntity } from './customer/customer.entity';
import { SearchModule } from './search/search.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'hanniecuisine',
      entities: [
        Menu,
        ReservationEntity,
        CancellationEntity,
        MessageEntity,
        CustomerEntity,
      ],
      synchronize: true,
    }),
    MenuModule,
    ReservationModule,
    CancellationsModule,
    MessageModule,
    CustomerModule,
    SearchModule,
    AdminModule,
  ],
})
export class AppModule {}
