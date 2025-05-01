/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   users.module.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/26 03:45:23 by mbah              #+#    #+#             */
/*   Updated: 2025/05/01 13:38:44 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BcryptUtilsService } from 'src/bcrypt-utils/bcrypt-utils.service';
import { AddressService } from 'src/address/address.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, BcryptUtilsService, AddressService]
})
export class UsersModule {}
