/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   prisma.service.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/15 22:18:35 by mbah              #+#    #+#             */
/*   Updated: 2025/05/03 17:21:06 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

	async onModuleInit() {
		let retries = 10; // Augmenter les tentatives
		const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
	  
		while (retries > 0) {
		  try {
			await this.$connect();
			await this.pingDatabase();
			console.log('✅ Connected to the database successfully!');
			return;
		  } catch (error) {
			retries--;
			console.error(`❌ Failed to connect to the database. Retries left: ${retries}`, error);
			if (retries === 0) {
			  console.error("❌ All connection attempts failed. Exiting...");
			  process.exit(1);  // Quitter l'application si toutes les tentatives échouent
			}
			await delay(5000); // Attendre 5 secondes avant la prochaine tentative
		  }
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