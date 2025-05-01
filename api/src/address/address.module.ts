import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
	providers: [AddressService],
	controllers: [AddressController]
})
export class AddressModule {}
