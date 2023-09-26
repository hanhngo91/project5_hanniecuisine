import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import CreateReservationDto from './dtos/create-reservation';
import { ReservationEntity } from './reservation.entity';
import { Menu } from 'src/menu/menu.entity';
import { CancellationEntity } from 'src/cancellations/cancellations.entity';
import { CustomerEntity } from 'src/customer/customer.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private reservationRepository: Repository<ReservationEntity>,

    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,

    @InjectRepository(CancellationEntity)
    private cancellationRepository: Repository<CancellationEntity>,

    @InjectRepository(CustomerEntity)
    private customerEntity: Repository<CustomerEntity>,
  ) {}
  //Get all reservations:
  async findAll(): Promise<ReservationEntity[]> {
    return await this.reservationRepository.find({
      order: { reserveDate: 'DESC' },
      relations: ['menu'],
    });
  }
  //Get reservation by id:
  async findOne(id: string): Promise<ReservationEntity | null> {
    return await this.reservationRepository.findOne({
      where: { reservationId: id },
    });
  }

  //Create a reservation:
  async createReservation(body: CreateReservationDto) {
    const menu = await this.menuRepository.findOne({
      where: { menuId: body.menu },
    });

    //Check vacancies:
    const reservations = await this.reservationRepository.find({
      where: {
        diningDate: body.diningDate,
        diningTime: body.diningTime,
        area: body.area,
      },
    });
    const totalGuests = reservations.reduce(
      (acc, cur) => acc + Number(cur.guests),
      0,
    ); //Count total guests

    //Count total times of rooms appearance in reservations:
    const totalRooms = () => {
      let count = 0;
      reservations.forEach((reservation) => {
        if (reservation.area === 'room') {
          count++;
        }
      });
      return count;
    };
    const rooms = totalRooms();

    //Check if customer has already made a reservation:
    const foundCustomer = await this.customerEntity.findOne({
      where: {
        customerName: body.customerName,
        email: body.email,
        tel: body.tel,
      },
    });

    if (foundCustomer) {
      //Reservation for old customer:
      const newReservation = this.reservationRepository.create({
        customerName: foundCustomer.customerName,
        email: foundCustomer.email,
        tel: foundCustomer.tel,
        guests: Number(body.guests),
        diningDate: body.diningDate,
        diningTime: body.diningTime,
        area: body.area,
        menu: [menu],
        discountPercentage: body.discountPercentage,
        total: body.total,
      });

      //Points for old customer:
      const newPointsForOldCustomer = this.customerEntity.create({
        customerId: foundCustomer.customerId,
        customerName: foundCustomer.customerName,
        email: foundCustomer.email,
        tel: foundCustomer.tel,
        points: Number(foundCustomer.points) + 1,
      });
      if (body.area === 'table') {
        if (totalGuests + body.guests > 50) {
          return {
            message: 'No table available!',
          };
        } else {
          foundCustomer.points += 1;
          await this.reservationRepository.save(newReservation);
          await this.customerEntity.save(newPointsForOldCustomer);
          return { message: 'Reservation created successfully!' };
        }
      } else if (body.area === 'bar') {
        if (totalGuests + body.guests > 10) {
          return {
            message: 'No seats available!',
          };
        } else {
          foundCustomer.points += 1;
          await this.reservationRepository.save(newReservation);
          await this.customerEntity.save(newPointsForOldCustomer);
          return { message: 'Reservation created successfully!' };
        }
      } else if (body.area === 'room') {
        if (rooms === 3) {
          return {
            message: 'No rooms available!',
          };
        } else {
          foundCustomer.points += 1;
          await this.reservationRepository.save(newReservation);
          await this.customerEntity.save(foundCustomer);
          return { message: 'Reservation created successfully!' };
        }
      }
    } else {
      //New customer:
      const newReservation2 = this.reservationRepository.create({
        customerName: body.customerName,
        email: body.email,
        tel: body.tel,
        guests: Number(body.guests),
        diningDate: body.diningDate,
        diningTime: body.diningTime,
        menu: [menu],
        area: body.area,
        discountPercentage: body.discountPercentage,
        total: body.total,
      });

      const newCustomer = this.customerEntity.create({
        customerName: body.customerName,
        email: body.email,
        tel: body.tel,
        points: 1,
      });
      if (body.area === 'table') {
        if (totalGuests + Number(body.guests) > 50) {
          return {
            message: 'No table available!',
          };
        } else {
          await this.reservationRepository.save(newReservation2);
          await this.customerEntity.save(newCustomer);
          return { message: 'Reservation created successfully!' };
        }
      } else if (body.area === 'bar') {
        if (totalGuests + Number(body.guests) > 10) {
          return {
            message: 'No seats available!',
          };
        } else {
          await this.reservationRepository.save(newReservation2);
          await this.customerEntity.save(newCustomer);
          return { message: 'Reservation created successfully!' };
        }
      } else if (body.area === 'room') {
        if (rooms === 3) {
          return {
            message: 'No rooms available!',
          };
        } else {
          await this.reservationRepository.save(newReservation2);
          await this.customerEntity.save(newCustomer);
          return { message: 'Reservation created successfully!' };
        }
      }
    }
  }
  //Delete a reservation:
  async deleteReservation(id: string) {
    try {
      const foundReservation = await this.reservationRepository.findOne({
        where: { reservationId: id },
        relations: ['menu'],
      });

      //Find customer:
      const foundCustomer = await this.customerEntity.findOne({
        where: {
          customerName: foundReservation.customerName,
          email: foundReservation.email,
          tel: foundReservation.tel,
        },
      })!;

      const newCancellation = this.cancellationRepository.create({
        customerName: foundReservation.customerName,
        email: foundReservation.email,
        tel: foundReservation.tel,
        guests: foundReservation.guests,
        menu: foundReservation.menu,
        diningDate: foundReservation.diningDate,
        diningTime: foundReservation.diningTime,
        area: foundReservation.area,
        total: foundReservation.total,
        reserveDate: foundReservation.reserveDate,
      });

      //Update points for old customer:
      const updatePointsForOldCustomer = this.customerEntity.create({
        customerId: foundCustomer?.customerId,
        customerName: foundCustomer?.customerName,
        email: foundCustomer?.email,
        tel: foundCustomer?.tel,
        points: Number(foundCustomer?.points) - 1,
      });

      if (foundReservation) {
        await this.reservationRepository.delete(id);
        await this.cancellationRepository.save(newCancellation);
        await this.customerEntity.save(updatePointsForOldCustomer);
        return { message: 'Reservation deleted successfully' };
      } else {
        return { message: 'Reservation not found in delete!' };
      }
    } catch (err) {
      console.log('Delete reservation error-->', err);
    }
  }

  //Update a reservation:
  async updateReservation(id: string, body: CreateReservationDto) {
    try {
      const menu = await this.menuRepository.findOne({
        where: { menuId: body.menu },
      });
      const foundReservation = await this.reservationRepository.findOne({
        where: { reservationId: id },
        relations: ['menu'],
      });

      //Check vacancies:
      const reservations = await this.reservationRepository.find({
        where: {
          diningDate: body.diningDate,
          diningTime: body.diningTime,
          area: body.area,
        },
      });
      const totalGuests = reservations.reduce(
        (acc, cur) => acc + Number(cur.guests),
        0,
      ); //Count total guests

      //Count total times of rooms appearance in reservations:
      const totalRooms = () => {
        let count = 0;
        reservations.forEach((reservation) => {
          if (reservation.area === 'room') {
            count++;
          }
        });
        return count;
      };
      const rooms = totalRooms();

      if (foundReservation) {
        if (body.area === 'table') {
          if (totalGuests + Number(body.guests) > 50) {
            return {
              message: 'No table available!',
            };
          } else {
            const updateReservation = Object.assign(foundReservation, body);
            return {
              message: 'Reservation updated successfully',
              result: await this.reservationRepository.save(updateReservation),
            };
          }
        } else if (body.area === 'bar') {
          if (totalGuests + Number(body.guests) > 10) {
            return {
              message: 'No seats available!',
            };
          } else {
            const updateReservation = Object.assign(foundReservation, body);

            return {
              message: 'Reservation updated successfully',
              result: await this.reservationRepository.save(updateReservation),
            };
          }
        } else if (body.area === 'room') {
          if (rooms === 3) {
            return {
              message: 'No rooms available!',
            };
          } else {
            const updateReservation = Object.assign(foundReservation, body);

            return {
              message: 'Reservation updated successfully',
              result: await this.reservationRepository.save(updateReservation),
            };
          }
        }
      } else {
        return { message: 'Reservation not found in update!' };
      }
    } catch (err) {
      console.log('Update reservation error-->', err);
    }
  }
}
