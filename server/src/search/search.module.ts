import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationEntity } from 'src/reservation/reservation.entity';
import { Menu } from 'src/menu/menu.entity';
import { CancellationEntity } from 'src/cancellations/cancellations.entity';
import { CustomerEntity } from 'src/customer/customer.entity';
import { MessageEntity } from 'src/message/message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReservationEntity,
      Menu,
      CancellationEntity,
      CustomerEntity,
      MessageEntity,
    ]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
