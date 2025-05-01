/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   cart.module.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/26 03:43:27 by mbah              #+#    #+#             */
/*   Updated: 2025/05/01 13:37:30 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
	providers: [CartService],
	controllers: [CartController]
})
export class CartModule {}
