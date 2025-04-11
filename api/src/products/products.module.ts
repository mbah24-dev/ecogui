/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   products.module.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/26 03:43:21 by mbah              #+#    #+#             */
/*   Updated: 2025/04/11 02:43:07 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { FormatImageService } from './format-image.service';

@Module({
	providers: [ProductsService, PrismaService, FormatImageService],
	controllers: [ProductsController]
})
export class ProductsModule {}
