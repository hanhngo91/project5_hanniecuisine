import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  customerId: string;

  @Column({ nullable: true })
  customerName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  tel: string;

  //@Exclude() //This decorator will exclude the points property from the response.
  //Client will not see it.
  @Column({ nullable: true })
  points: number;
}
