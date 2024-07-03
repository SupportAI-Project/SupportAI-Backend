import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('regular-user')
  getProfile() {
    return 'Regular user permissions';
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('admin-user')
  getAdminProfile() {
    return 'Admin user permissions';
  }
}
