/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   prisma.service.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/15 22:18:35 by mbah              #+#    #+#             */
/*   Updated: 2025/04/30 18:21:24 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ Connected to the database successfully!');
      await this.pingDatabase();
    } catch (error) {
      console.error('❌ Failed to connect to the database:', error);
      process.exit(1);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  private async pingDatabase() {
    try {
      await this.$queryRaw`SELECT 1`;
      console.log('✅ Database ping successful!');
    } catch (error) {
      console.error('❌ Database ping failed:', error);
      process.exit(1);
    }
  }
}