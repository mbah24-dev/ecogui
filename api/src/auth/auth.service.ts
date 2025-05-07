import { sanitizeUser } from 'src/utility/sanitize_user';
import { Req, Body } from '@nestjs/common';
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
import { CreateUserDto } from 'src/dto/users/create-user.dto';
import { LoginDto } from 'src/dto/auth/login-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { Request as RequestExpressSession, Response } from 'express'
import { ResetPasswordDto } from 'src/dto/auth/reset-password.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly bcryptUtils: BcryptUtilsService,
		private readonly userService: UsersService,
		private readonly jwtService: JwtService
	) {}
	
	async signin(signinBody: LoginDto, role: Role, req: RequestExpressSession, res: Response) {
		const { email, password } = signinBody;
		const foundUser = await this.prismaService.user.findUnique({
			where: { email },
		});
		if (!foundUser) {
			throw new UnauthorizedException('Email incorrect.');
		}
		if ((foundUser.role !== role && foundUser.role !== Role.BUYER_AND_SELLER) || (foundUser.role === Role.BANNED)) {
			throw new HttpException('Access Denied', HttpStatus.UNAUTHORIZED);
		}
	
		// TODO a commenter pour le test
		const isValidPassword = await this.bcryptUtils.isValidPassword(password, foundUser.password);
		if (!isValidPassword) {
			throw new UnauthorizedException('Mot de passe incorrect.');
		}
		// TODO a decommenter pour le test
		//if (password !== foundUser.password) throw new UnauthorizedException('Mot de passe incorrect.');
		const token = this.bcryptUtils.generateToken({
			userId: foundUser.id,
			email: foundUser.email,
			role: foundUser.role,
		});

		req.session.user = sanitizeUser(foundUser);

		await this.prismaService.user.update({
			where: { id: foundUser.id},
			data: { isOnline: true }
		});
	
		return res.json({
			message: 'Connexion réussie',
			accessToken: token,
			user: req.session.user,
		});
	}
	
	async signup(signupBody: CreateUserDto, req: RequestExpressSession, res: Response) {
		const { email, role } = signupBody;
		let newRole: Role;
	
		return await this.prismaService.$transaction(async (transaction) => {
			const existingUser = await transaction.user.findUnique({ where: { email } });
	
			let userId: string;
	
			if (existingUser) {
				if (
					existingUser.role === role ||
					existingUser.role === Role.BUYER_AND_SELLER
				) {
					console.log("cas 1 refus : " + role + " page & " + "user role: " + existingUser.role);
					throw new HttpException(
						'Vous avez déjà un compte, pensez à vous connecter',
						HttpStatus.CONFLICT
					);
				} else {
					// Mise à jour du rôle en B&S
					console.log("cas 2 update : " + role + " page & " + "user role: " + existingUser.role);
					await transaction.user.update({
						where: { id: existingUser.id },
						data: { role: Role.BUYER_AND_SELLER },
					});
					userId = existingUser.id;
					newRole = Role.BUYER_AND_SELLER;
				}
			} else {
				console.log("cas 3 create : " + role + " page");
				const newUser = await this.userService.create_user(signupBody, transaction);
				userId = newUser.user_Id;
				newRole = role;
			}
	
			const foundUser = await transaction.user.findUnique({ where: { id: userId } });
			if (!foundUser) {
				throw new UnauthorizedException("Erreur lors de l'inscription");
			}
	
			const token = this.bcryptUtils.generateToken({
				userId,
				email,
				role: newRole,
			});
	
			await transaction.user.update({
				where: { id: userId },
				data: { isOnline: true },
			});
	
			// NOTE: req.session ne peut pas être modifié en dehors du contexte HTTP.
			req.session.user = sanitizeUser(foundUser);
	
			res.json({
				message: "Inscription réussie",
				accessToken: token,
				user: req.session.user,
			});
		});
	}
	
	async signout(@Req() req: RequestExpressSession, res: Response) {
		if (req.session.user) {
			await this.prismaService.user.update({
				where: { id: req.session.user.id } ,
				data: { isOnline: false }
			})
		}
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

	async resetPassword(token: string, body: ResetPasswordDto) {
		try {
			const { password }: ResetPasswordDto = body;
			const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });

			const user = await this.prismaService.user.findUnique({
				where: {
					id: decoded.userId,
					resetToken: token
				}
			});

			if (!user) {
				throw new HttpException('Token invalide ou expiré', HttpStatus.BAD_REQUEST);
			}

			const newPasswordHashed = await this.bcryptUtils.hashPassword(password);

			await this.prismaService.user.update({
				where: {id: decoded.userId},
				data: {
					password: newPasswordHashed,
					resetToken: null
				}
			});
			return ({ message: 'Mot de passe réinitialisé avec succès !' });
		} catch (error) {
			throw new HttpException('Ce lien n\'est plus valide.\nMerci de recommencer la procédure de réinitialisation.', HttpStatus.BAD_REQUEST);
		}
	}
}
