/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   auth.controller.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/12 17:36:08 by mbah              #+#    #+#             */
/*   Updated: 2025/04/12 17:36:09 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Body, Controller, Get, Post, UseGuards, Request, Req, UnauthorizedException, Res, Param, Query } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/users/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RequestWithUser } from '../jwt/jwt.strategy';
import { LoginDto } from 'src/dto/auth/login-user.dto';
import { Role } from '@prisma/client';
import { Request as RequestExpressSession, Response } from 'express';
import { SendEmailDto } from 'src/dto/send-email/send-email.dto';
import { SendEmailService } from 'src/send-email/send-email.service';
import { ResetPasswordDto } from 'src/dto/auth/reset-password.dto';
import { AdminGuard } from '../guards/admin.guard';
import { IsAdmin } from '../decorator/is-admin.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger'; // Importation des décorateurs Swagger

@ApiTags('Auth') // Etiquette pour regrouper toutes les routes liées à l'authentification
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UsersService,
		private readonly sendEmail: SendEmailService
	) {}
	
	@UseGuards(JwtAuthGuard)
	@Get()
	@ApiOperation({ summary: 'Authentifie l\'utilisateur connecté.' })
	@ApiResponse({ status: 200, description: 'Utilisateur authentifié avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async authenticateUser(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		return res.json({ user: req.session.user });
	}
	
	@Post('signin/buyer')
	@ApiOperation({ summary: 'Connexion en tant qu\'acheteur.' })
	@ApiBody({ type: LoginDto })
	@ApiResponse({ status: 200, description: 'Connexion réussie en tant qu\'acheteur.' })
	@ApiResponse({ status: 400, description: 'Échec de la connexion.' })
	async signin_buyer(@Body() userInfo: LoginDto, @Req() req: RequestExpressSession, @Res() res: Response) {
		console.log('Tentative de connexion:', userInfo);
		const role: Role = Role.BUYER;
		return (await this.authService.signin(userInfo, role, req, res));
	}

	@Post('signup/buyer')
	@ApiOperation({ summary: 'Inscription en tant qu\'acheteur.' })
	@ApiBody({ type: CreateUserDto })
	@ApiResponse({ status: 201, description: 'Inscription réussie en tant qu\'acheteur.' })
	async signup_buyer(@Body() userInfo: CreateUserDto, @Req() req: RequestExpressSession, @Res() res: Response) {
		return (await this.authService.signup(userInfo, req, res));
	}

	@Post('signin/seller')
	@ApiOperation({ summary: 'Connexion en tant que vendeur.' })
	@ApiBody({ type: LoginDto })
	@ApiResponse({ status: 200, description: 'Connexion réussie en tant que vendeur.' })
	@ApiResponse({ status: 400, description: 'Échec de la connexion.' })
	async signin_seller(@Body() userInfo: LoginDto, @Req() req: RequestExpressSession, @Res() res: Response) {
		const role: Role = Role.SELLER;
		return (await this.authService.signin(userInfo, role, req, res));
	}

	@Post('signup/seller')
	@ApiOperation({ summary: 'Inscription en tant que vendeur.' })
	@ApiBody({ type: CreateUserDto })
	@ApiResponse({ status: 201, description: 'Inscription réussie en tant que vendeur.' })
	async signup_seller(@Body() userInfo: CreateUserDto, @Req() req: RequestExpressSession, @Res() res: Response) {
		userInfo.role = Role.SELLER;
		return (await this.authService.signup(userInfo, req, res));
	}

	@Post('signin/admin')
	@ApiOperation({ summary: 'Connexion en tant qu\'administrateur.' })
	@ApiBody({ type: LoginDto })
	@ApiResponse({ status: 200, description: 'Connexion réussie en tant qu\'administrateur.' })
	@ApiResponse({ status: 400, description: 'Échec de la connexion.' })
	async signin_admin(@Body() userInfo: LoginDto, @Req() req: RequestExpressSession, @Res() res: Response) {
		const role: Role = Role.ADMIN;
		return (await this.authService.signin(userInfo, role, req, res));
	}
	
	@UseGuards(JwtAuthGuard)
	@Post('logout')
	@ApiOperation({ summary: 'Déconnexion de l\'utilisateur.' })
	@ApiResponse({ status: 200, description: 'Utilisateur déconnecté avec succès.' })
	async logout(@Req() req: RequestExpressSession, @Res() res: Response) {
		return this.authService.signout(req, res);
	}

	@UseGuards(JwtAuthGuard)
	@Get('session')
	@ApiOperation({ summary: 'Récupère la session de l\'utilisateur.' })
	@ApiResponse({ status: 200, description: 'Session de l\'utilisateur récupérée avec succès.' })
	@ApiResponse({ status: 401, description: 'Aucune session active.' })
	async getSession(@Req() req: RequestExpressSession) {
		if (!req.session.user) {
			throw new UnauthorizedException('Aucune session active');
		}
		return req.session.user;
	}

	@Post('send-email')
	@ApiOperation({ summary: 'Envoie un email de réinitialisation de mot de passe.' })
	@ApiBody({ type: SendEmailDto })
	@ApiResponse({ status: 200, description: 'Email envoyé avec succès.' })
	async send_email(@Body() body: SendEmailDto) {
		return (await this.sendEmail.requestPasswordReset(body));
	}

	@Post('reset-password')
	@ApiOperation({ summary: 'Réinitialise le mot de passe de l\'utilisateur.' })
	@ApiBody({ type: ResetPasswordDto })
	@ApiQuery({ name: 'token', description: 'Token de réinitialisation' })
	@ApiResponse({ status: 200, description: 'Mot de passe réinitialisé avec succès.' })
	@ApiResponse({ status: 400, description: 'Token invalide ou expiré.' })
	async reset_password(@Body() body: ResetPasswordDto, @Query('token') token: string) {
		return (await this.authService.resetPassword(token, body));
	}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@IsAdmin()
	@Post('me/admin/signup')
	@ApiOperation({ summary: 'Inscription d\'un nouvel administrateur (accessible uniquement aux admins).' })
	@ApiBody({ type: CreateUserDto })
	@ApiResponse({ status: 201, description: 'Nouvel administrateur inscrit avec succès.' })
	async signup_admin(@Body() userInfo: CreateUserDto, @Req() req: RequestExpressSession, @Res() res: Response) {
		userInfo.role = Role.ADMIN;
		return (await this.authService.signup(userInfo, req, res));
	}
}
