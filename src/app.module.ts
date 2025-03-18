/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.module.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/15 22:20:33 by mbah              #+#    #+#             */
/*   Updated: 2025/03/15 23:29:43 by mbah             ###   ########.fr       */
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


@Module({
  imports: [
	PrismaModule,
	AuthModule,
	UsersModule,
	ConfigModule.forRoot({
		isGlobal: true,
	})
  ],
  controllers: [],
  providers: [PrismaService, AuthService, UsersService, BcryptUtilsService],
})
export class AppModule {}
