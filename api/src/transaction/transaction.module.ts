import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionController } from './transaction.controller';
import { TransactionUtils } from './transaction-utils.service';
import { SendEmailService } from 'src/send-email/send-email.service';
import { OrdersValidationService } from './orders-validation.service';
import { InvoiceService } from 'src/invoice/invoice.service';
import { AddressService } from 'src/address/address.service';

@Module({
	providers: [
		TransactionService,
		TransactionUtils,
		SendEmailService,
		OrdersValidationService,
		AddressService,
		InvoiceService
	],
	controllers: [TransactionController]
})
export class TransactionModule {}
