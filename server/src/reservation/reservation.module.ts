import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { ReservationEntity } from './reservation.entity';
import { Menu } from 'src/menu/menu.entity';
import { CancellationEntity } from 'src/cancellations/cancellations.entity';
import { CustomerEntity } from 'src/customer/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReservationEntity,
      Menu,
      CancellationEntity,
      CustomerEntity,
    ]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
