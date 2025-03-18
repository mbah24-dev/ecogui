/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   bcrypt-utils.service.ts                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/15 23:09:46 by mbah              #+#    #+#             */
/*   Updated: 2025/03/16 14:32:38 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { hash, compare } from 'bcrypt'

@Injectable()
export class BcryptUtilsService {
	constructor(private readonly jwtService: JwtService) {}
	
	async hashPassword(password: string) {
		const hashedPassword = await hash(password, 10);
		return (hashedPassword);
	}

	async isValidPassword(password: string, hashedPassword: string) {
		const boolResponse = await compare(password, hashedPassword);
		return (boolResponse);
	}
	
	generateToken(payload: { userId: string, email: string, role: Role }) {
		return (this.jwtService.sign(payload));
	}
}
