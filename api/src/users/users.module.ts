import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BcryptUtilsService } from 'src/bcrypt-utils/bcrypt-utils.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, BcryptUtilsService]
})
export class UsersModule {}
