import { CancellationEntity } from './cancellations.entity';
import { CancellationsService } from './cancellations.service';
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('cancellations')
export class CancellationsController {
  constructor(public cancellationsService: CancellationsService) {}
  //Get all cancellations:
  @Get()
  async findAll(): Promise<CancellationEntity[]> {
    return await this.cancellationsService.findAll();
  }
}
