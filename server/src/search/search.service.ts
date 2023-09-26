import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CancellationEntity } from 'src/cancellations/cancellations.entity';
import { CustomerEntity } from 'src/customer/customer.entity';
import { Menu } from 'src/menu/menu.entity';
import { MessageEntity } from 'src/message/message.entity';
import { ReservationEntity } from 'src/reservation/reservation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(ReservationEntity)
    private reservationRepository: Repository<ReservationEntity>,

    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,

    @InjectRepository(CancellationEntity)
    private cancellationRepository: Repository<CancellationEntity>,

    @InjectRepository(CustomerEntity)
    private customerEntity: Repository<CustomerEntity>,

    @InjectRepository(MessageEntity)
    private messageEntity: Repository<MessageEntity>,
  ) {}

  //Search in reservations:
  async searchReservation(key: any, res: any) {
    try {
      const result = await this.reservationRepository
        .createQueryBuilder('reservation')
        .where('reservation.customerName LIKE :key', { key: `%${key}%` })
        .orWhere('reservation.email LIKE :key', { key: `%${key}%` })
        .orWhere('reservation.tel LIKE :key', { key: `%${key}%` })
        .orWhere('reservation.diningDate LIKE :key', { key: `%${key}%` })
        .orWhere('reservation.diningTime LIKE :key', { key: `%${key}%` })
        .orWhere('reservation.area LIKE :key', { key: `%${key}%` })
        .getMany();

      return res.json(result);
    } catch (error) {
      console.log('Error when search in reservations: ', error);
    }
  }

  //Search in cancellations:
  async searchCancellations(key: any, res: any) {
    try {
      const result = await this.cancellationRepository
        .createQueryBuilder('cancellation')
        .where('cancellation.customerName LIKE :key', { key: `%${key}%` })
        .orWhere('cancellation.email LIKE :key', { key: `%${key}%` })
        .orWhere('cancellation.tel LIKE :key', { key: `%${key}%` })
        .orWhere('cancellation.diningDate LIKE :key', { key: `%${key}%` })
        .orWhere('cancellation.diningTime LIKE :key', { key: `%${key}%` })
        .orWhere('cancellation.area LIKE :key', { key: `%${key}%` })
        .getMany();

      return res.json(result);
    } catch (error) {
      console.log('Error when search in cancellations: ', error);
    }
  }

  //Search in menus:
  async searchMenu(key: any, res: any) {
    try {
      const result = await this.menuRepository
        .createQueryBuilder('menu')
        .where('menu.menuName LIKE :key', { key: `%${key}%` })
        .orWhere('menu.price LIKE :key', { key: `%${key}%` })
        .getMany();

      return res.json(result);
    } catch (error) {
      console.log('Error when search in menus: ', error);
    }
  }

  //Search in customers:
  async searchCustomer(key: any, res: any) {
    try {
      const result = await this.customerEntity
        .createQueryBuilder('customer')
        .where('customer.customerName LIKE :key', { key: `%${key}%` })
        .orWhere('customer.email LIKE :key', { key: `%${key}%` })
        .orWhere('customer.tel LIKE :key', { key: `%${key}%` })
        .getMany();

      return res.json(result);
    } catch (error) {
      console.log('Error when search in customers: ', error);
    }
  }

  //Search in messages:
  async searchMessage(key: any, res: any) {
    try {
      const result = await this.messageEntity
        .createQueryBuilder('message')
        .where('message.firstName LIKE :key', { key: `%${key}%` })
        .orWhere('message.lastName LIKE :key', { key: `%${key}%` })
        .orWhere('message.email LIKE :key', { key: `%${key}%` })
        .orWhere('message.tel LIKE :key', { key: `%${key}%` })
        .orWhere('message.subject LIKE :key', { key: `%${key}%` })
        .getMany();

      return res.json(result);
    } catch (error) {
      console.log('Error when search in messages: ', error);
    }
  }
}
