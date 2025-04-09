/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   send-email.module.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/26 03:44:35 by mbah              #+#    #+#             */
/*   Updated: 2025/03/30 18:32:47 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Module } from '@nestjs/common';
import { SendEmailService } from './send-email.service';
import { JwtModule } from '@nestjs/jwt';
import { BcryptUtilsService } from 'src/bcrypt-utils/bcrypt-utils.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendEmailController } from './send-email.controller';

@Module({
  providers: [SendEmailService, PrismaService],
  controllers: [SendEmailController]
})
export class SendEmailModule {}
