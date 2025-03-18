import { Req } from '@nestjs/common';
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   auth.service.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/15 23:06:45 by mbah              #+#    #+#             */
/*   Updated: 2025/03/17 17:54:00 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { HttpException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { BcryptUtilsService } from 'src/bcrypt-utils/bcrypt-utils.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginDto } from 'src/dto/login-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { Request as RequestExpressSession, Response } from 'express'

@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly bcryptUtils: BcryptUtilsService,
		private readonly userService: UsersService
	) {}
	
	async signin(signinBody: LoginDto, role: Role, req: RequestExpressSession, res: Response) {
		const { email, password } = signinBody;
		
		// 1️⃣ Vérification de l'utilisateur en base de données
		const foundUser = await this.prismaService.user.findUnique({
			where: { email },
		});
		if (!foundUser) {
			throw new UnauthorizedException('Email incorrect.');
		}
	
		// 2️⃣ Vérification du rôle et bannissement
		if ((foundUser.role !== role && foundUser.role !== Role.BUYER_AND_SELLER) || (foundUser.role === Role.BANNED)) {
			throw new HttpException('Access Denied', HttpStatus.UNAUTHORIZED);
		}
	
		// 3️⃣ Vérification du mot de passe
		const isValidPassword = await this.bcryptUtils.isValidPassword(password, foundUser.password);
		if (!isValidPassword) {
			throw new UnauthorizedException('Mot de passe incorrect.');
		}
	
		// 4️⃣ Génération du token JWT
		const token = this.bcryptUtils.generateToken({
			userId: foundUser.id,
			email: foundUser.email,
			role: foundUser.role,
		});
	
		// 5️⃣ Stockage de l'utilisateur dans la session
		req.session.user = {
			id: foundUser.id,
			email: foundUser.email,
			role: foundUser.role,
		};
	
		// 6️⃣ Retourne le token et les infos de l'utilisateur
		return res.json({
			message: 'Connexion réussie',
			accessToken: token,
			user: req.session.user,
		});
	}
	

	async signup(signupBody: CreateUserDto) {
		const addUserObject = await this.userService.create_user(signupBody);
		return (this.bcryptUtils.generateToken({
			userId: addUserObject.user_Id,
			email: signupBody.email,
			role: signupBody.role
		}));
	}

	async signout(@Req() req: RequestExpressSession, res: Response) {
		req.session.destroy((err) => {
		  if (err)
			throw new InternalServerErrorException('Erreur lors de la déconnexion');
		});
		return ({
			statusCode: HttpStatus.OK,
			message: 'Déconnecté avec succès',
			response: res.json()
		});
	}
}
