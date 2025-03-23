/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   auth.module.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/15 23:06:42 by mbah              #+#    #+#             */
/*   Updated: 2025/03/23 18:27:07 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { BcryptUtilsService } from 'src/bcrypt-utils/bcrypt-utils.service';
import { SendEmailService } from 'src/send-email/send-email.service';

@Module({
	imports: [
	  JwtModule.register({
		  global: true,
		  secret: process.env.JWT_SECRET,
		  signOptions: { expiresIn: '37d' }
	  }),
	],
	providers: [AuthService, BcryptUtilsService, UsersService, PrismaService, JwtModule, JwtStrategy, SendEmailService],
	controllers: [AuthController]
  })
  export class AuthModule {}
