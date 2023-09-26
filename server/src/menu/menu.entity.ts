import { CancellationEntity } from 'src/cancellations/cancellations.entity';
import { ReservationEntity } from './../reservation/reservation.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  menuId: string;

  @Column({ nullable: true })
  menuName: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'varchar', default: 'available' })
  menuStatus: string;

  @ManyToMany(() => ReservationEntity, (reservation) => reservation.menu)
  reservations: ReservationEntity[];

  @ManyToMany(() => CancellationEntity, (cancellation) => cancellation.menu)
  cancellations: CancellationEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  uploadDate: Date;
}
