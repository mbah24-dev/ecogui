/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   prisma.module.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/15 22:26:03 by mbah              #+#    #+#             */
/*   Updated: 2025/05/01 13:36:50 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaController } from './prisma.controller';

@Global() // comme ca AppModule peux exposer PrismaModule dans tous les enfants
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  controllers: [PrismaController],
})
export class PrismaModule {}
