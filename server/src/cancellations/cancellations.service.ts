import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CancellationEntity } from './cancellations.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CancellationsService {
  constructor(
    @InjectRepository(CancellationEntity)
    private cancellationRepository: Repository<CancellationEntity>,
  ) {}
  //Find all cancellations:
  async findAll(): Promise<CancellationEntity[]> {
    const response = await this.cancellationRepository.find({
      order: { cancelDate: 'DESC' },
      relations: ['menu'],
    });
    return response;
  }
}
