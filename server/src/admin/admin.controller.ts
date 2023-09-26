import { Controller, Post, Body, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminLoginDto } from './dtos/admin.dto';
import { Response } from 'express';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  //Admin login:
  @Post('login')
  async adminLogin(@Body() loginDto: AdminLoginDto, @Res() res: Response) {
    console.log('Admin login dto===>: ', loginDto);
    console.log('Admin login res===>: ', res);

    return await this.adminService.adminLogin(loginDto, res);
  }
}
