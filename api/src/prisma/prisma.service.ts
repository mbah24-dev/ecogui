/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   prisma.service.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/15 22:18:35 by mbah              #+#    #+#             */
/*   Updated: 2025/04/28 17:56:07 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly MAX_RETRIES = 5;
  private readonly RETRY_DELAY_MS = 3000; // 3 secondes

  async onModuleInit() {
    await this.connectWithRetry();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  private async connectWithRetry() {
    for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
      try {
        await this.$connect();
        console.log('✅ Connected to the database successfully!');
        await this.pingDatabase();
        return; // Success, exit retry loop
      } catch (error) {
        console.error(`❌ Database connection failed on attempt ${attempt}/${this.MAX_RETRIES}:`, error);

        if (attempt === this.MAX_RETRIES) {
          console.error('❌ Max retries reached. Exiting application...');
          process.exit(1);
        }

        console.log(`🔄 Retrying in ${this.RETRY_DELAY_MS / 1000} seconds...`);
        await this.delay(this.RETRY_DELAY_MS);
      }
    }
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

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
