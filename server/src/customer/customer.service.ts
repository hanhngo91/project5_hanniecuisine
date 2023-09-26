import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerReposity: Repository<CustomerEntity>,
  ) {}

  //Get all customers:
  async findAll(): Promise<CustomerEntity[]> {
    return await this.customerReposity.find({
      order: {
        points: 'DESC',
      },
    });
  }
}
