import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import CreateReservationDto from './dtos/create-reservation';

@Controller('reservation')
export class ReservationController {
  constructor(public reservationService: ReservationService) {}
  //Get all reservations:
  @Get()
  async findAll() {
    return await this.reservationService.findAll();
  }
  //Get a reservation:
  @Get('/:id')
  async getReservationById(@Param('id') id: string) {
    return await this.reservationService.findOne(id);
  }
  //Create a reservation:
  @Post()
  createReservation(@Body() body: CreateReservationDto) {
    return this.reservationService.createReservation(body);
  }
  //Delete a reservation:
  @Delete('/:id')
  deleteReservation(@Param('id') id: string) {
    return this.reservationService.deleteReservation(id);
  }

  //Update a reservation:
  @Put('/:id')
  updateReservation(
    @Param('id') id: string,
    @Body() body: CreateReservationDto,
  ) {
    return this.reservationService.updateReservation(id, body);
  }
}
