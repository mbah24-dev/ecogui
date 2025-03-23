import { Module } from '@nestjs/common';
import { SendEmailService } from './send-email.service';
import { JwtModule } from '@nestjs/jwt';
import { BcryptUtilsService } from 'src/bcrypt-utils/bcrypt-utils.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [SendEmailService, PrismaService]
})
export class SendEmailModule {}
