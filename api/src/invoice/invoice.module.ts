import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressService } from 'src/address/address.service';

@Module({
  providers: [InvoiceService, AddressService],
  controllers: [InvoiceController]
})
export class InvoiceModule {}
