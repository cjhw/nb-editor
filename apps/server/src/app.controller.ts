import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from 'farm-prisma';
import { UserService } from './modules/user/user.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(UserService)
  private userService: UserService;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/user')
  getUser() {
    return this.userService.getUser({});
  }
}
