import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/database/PrismaService';
import { Prisma } from 'farm-prisma';

@Injectable()
export class UserService {
  @Inject(PrismaService)
  private prisma: PrismaService;

  async getUser(data: Prisma.UserCreateInput) {
    return await this.prisma.user.findMany({});
  }
}
