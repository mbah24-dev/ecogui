/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.module.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/15 22:20:33 by mbah              #+#    #+#             */
/*   Updated: 2025/03/30 18:41:55 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SendEmailModule } from './send-email/send-email.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { TransactionModule } from './transaction/transaction.module';
import { InvoiceModule } from './invoice/invoice.module';
import { AddressModule } from './address/address.module';
import { ReviewModule } from './review/review.module';


@Module({
  imports: [
	PrismaModule,
	AuthModule,
	UsersModule,
	ConfigModule.forRoot({
		isGlobal: true,
	}),
	SendEmailModule,
	ProductsModule,
	CartModule,
	TransactionModule,
	InvoiceModule,
	AddressModule,
	ReviewModule,
	
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
