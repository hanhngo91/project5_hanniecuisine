import { Menu } from 'src/menu/menu.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
@Entity()
export class CancellationEntity {
  @PrimaryGeneratedColumn('uuid')
  cancellationId: string;

  @Column({ nullable: true })
  customerName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  tel: string;

  @Column({ nullable: true })
  guests: number;

  @ManyToMany(() => Menu, (menu) => menu.cancellations)
  @JoinTable()
  menu: Menu[];

  @Column({ nullable: true })
  diningDate: string;

  @Column({ nullable: true })
  diningTime: string;

  @Column({ nullable: true })
  area: string;

  @Column({ nullable: true })
  total: number;

  @Column({ nullable: true })
  reserveDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  cancelDate: Date;
}
