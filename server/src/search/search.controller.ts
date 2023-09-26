import { SearchService } from './search.service';
import { Controller, Get, Query, Res, Response } from '@nestjs/common';

@Controller('search')
export class SearchController {
  constructor(public searchService: SearchService) {}

  //Search in reservations:
  @Get('reservation/key')
  async searchReservation(@Query('key') key: any, @Res() res: Response) {
    return await this.searchService.searchReservation(key, res);
  }

  //Search in menus:
  @Get('menu/key')
  async searchMenu(@Query('key') key: any, @Res() res: Response) {
    return await this.searchService.searchMenu(key, res);
  }

  //Search in cancellations:
  @Get('cancellation/key')
  async searchCancellations(@Query('key') key: any, @Res() res: Response) {
    return await this.searchService.searchCancellations(key, res);
  }

  //Search in customers:
  @Get('customer/key')
  async searchCustomer(@Query('key') key: any, @Res() res: Response) {
    return await this.searchService.searchCustomer(key, res);
  }

  //Search in messages:
  @Get('message/key')
  async searchMessage(@Query('key') key: any, @Res() res: Response) {
    return await this.searchService.searchMessage(key, res);
  }
}
