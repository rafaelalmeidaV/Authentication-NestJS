/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UserModule {}
