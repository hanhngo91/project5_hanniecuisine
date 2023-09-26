import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminLoginDto } from './dtos/admin.dto';
import { Response } from 'express';

@Injectable()
export class AdminService {
  constructor(private readonly jwtService: JwtService) {}

  //Admin login:
  async adminLogin(loginDto: AdminLoginDto, @Res() res: Response) {
    const adminEmail = 'hanhngo@gmail.com';
    const adminPassword = 'Hanh1234';
    if (loginDto.adminEmail !== adminEmail) {
      return res.json({
        message: 'Email is incorrect!',
      });
    } else if (loginDto.adminPassword !== adminPassword) {
      return res.json({
        message: 'Password is incorrect!',
      });
    } else {
      const payload = { adminEmail: loginDto.adminEmail };
      const token = this.jwtService.sign(payload);
      return res.json({
        message: 'Admin login successfully!',
        token,
      });
    }
  }
}
