import { Expose } from 'class-transformer';

export class CustomerDto {
  @Expose()
  customerId: string;

  @Expose()
  customerName: string;

  @Expose()
  email: string;

  @Expose()
  tel: string;

  // points: number;
}
