/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   prisma.controller.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/28 18:01:20 by mbah              #+#    #+#             */
/*   Updated: 2025/04/28 18:01:53 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Prisma') // Groupe dans Swagger
@Controller('prisma')
export class PrismaController {
	constructor(private readonly prisma: PrismaService) {}

	@ApiOperation({ summary: 'Check database connection status' })
	@ApiResponse({
		status: 200,
		description: 'Database is connected.',
		schema: {
			example: { status: 'ok', database: 'connected' },
		},
	})
	@ApiResponse({
		status: 503,
		description: 'Database is disconnected.',
		schema: {
			example: { status: 'error', database: 'disconnected', error: 'Connection error details' },
		},
	})
	@Get('database/connection/status')
	async getHealth() {
		try {
			await this.prisma.$queryRaw`SELECT 1`; // ping SQL
			return { status: 'ok', database: 'connected' };
		} catch (error) {
			return { status: 'error', database: 'disconnected', error: error.message };
		}
	}
}
