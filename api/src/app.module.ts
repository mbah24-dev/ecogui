/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.module.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/15 22:20:33 by mbah              #+#    #+#             */
/*   Updated: 2025/03/18 17:35:23 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { BcryptUtilsService } from './bcrypt-utils/bcrypt-utils.service';
import { ConfigModule } from '@nestjs/config';
import { SendEmailController } from './send-email/send-email.controller';
import { SendEmailModule } from './send-email/send-email.module';


@Module({
  imports: [
	PrismaModule,
	AuthModule,
	UsersModule,
	ConfigModule.forRoot({
		isGlobal: true,
	}),
	SendEmailModule
  ],
  controllers: [SendEmailController],
  providers: [PrismaService, AuthService, UsersService, BcryptUtilsService],
})
export class AppModule {}
