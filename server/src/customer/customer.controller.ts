import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerEntity } from './customer.entity';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { CustomerDto } from './dtos/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(public customerService: CustomerService) {}
  //Get all customers:
  //@UseInterceptors(ClassSerializerInterceptor) //This build-in decorator will exclude the column property from the response that has the @Exclude() decorator in entity.
  //@UseInterceptors(new SerializeInterceptor(CustomerDto)) //Custom serialzier interceptor for customer entity.
  @Get()
  findAll(): Promise<CustomerEntity[]> {
    return this.customerService.findAll();
  }
}
