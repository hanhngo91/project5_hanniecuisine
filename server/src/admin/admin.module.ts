import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      signOptions: { expiresIn: '1h' },
      secret: 'HannieHannieHanh999@HN&SLV',
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
