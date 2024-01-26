import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '@/common/database/PrismaService';

@Module({
  providers: [UserService, PrismaService],
  exports: [UserService, PrismaService],
})
export class UserModule {}
