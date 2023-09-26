import { Menu } from 'src/menu/menu.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity('reservation_entity')
export class ReservationEntity {
  @PrimaryGeneratedColumn('uuid')
  reservationId: string;

  @Column({ nullable: true })
  customerName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  tel: string;

  @Column({ nullable: true })
  guests: number;

  @Column({ nullable: true })
  diningDate: string;

  @Column({ nullable: true })
  diningTime: string;

  @ManyToMany(() => Menu, (menu) => menu.reservations, { cascade: true })
  @JoinTable()
  menu: Menu[];

  @Column({ nullable: true })
  area: string;

  @Column({ nullable: true })
  discountPercentage: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'int', default: 0 })
  paymentStatus: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  reserveDate: Date;
}
