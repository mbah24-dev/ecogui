import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionController } from './transaction.controller';
import { TransactionUtils } from './transaction-utils.service';
import { SendEmailService } from 'src/send-email/send-email.service';
import { OrdersValidationService } from './orders-validation.service';

@Module({
	providers: [
		TransactionService,
		PrismaService,
		TransactionUtils,
		SendEmailService,
		OrdersValidationService
	],
	controllers: [TransactionController]
})
export class TransactionModule {}
