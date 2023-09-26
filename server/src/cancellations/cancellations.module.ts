import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CancellationsController } from './cancellations.controller';
import { CancellationsService } from './cancellations.service';
import { CancellationEntity } from './cancellations.entity';
import { Menu } from 'src/menu/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CancellationEntity, Menu])],
  controllers: [CancellationsController],
  providers: [CancellationsService],
})
export class CancellationsModule {}
