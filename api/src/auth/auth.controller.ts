/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   auth.controller.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/15 23:06:39 by mbah              #+#    #+#             */
/*   Updated: 2025/03/23 18:16:58 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Body, Controller, Get, Post, UseGuards, Request, Req, UnauthorizedException, Res, Param, Query } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestWithUser } from './jwt.strategy';
import { LoginDto } from 'src/dto/login-user.dto';
import { Role } from '@prisma/client';
import { Request as RequestExpressSession, Response } from 'express';
import { SendEmailDto } from 'src/dto/send-email.dto';
import { SendEmailService } from 'src/send-email/send-email.service';
import { ResetPasswordDto } from 'src/dto/reset-password.dto';


@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UsersService,
		private readonly sendEmail: SendEmailService
	) {}
	
	@UseGuards(JwtAuthGuard)
	@Get()
	async authenticateUser(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		return res.json({ user: req.session.user });
	}
	
	@Post('signin/buyer')
	async signin_buyer(@Body() userInfo: LoginDto, @Req() req: RequestExpressSession, @Res() res: Response) {
		console.log('Tentative de connexion:', userInfo);
		const role: Role = Role.BUYER;
		return (await this.authService.signin(userInfo, role, req, res));
	}

	@Post('signup/buyer')
	async signup_buyer(@Body() userInfo: CreateUserDto, @Req() req: RequestExpressSession, @Res() res: Response) {
		return (await this.authService.signup(userInfo, req, res));
	}

	@Post('signin/seller')
	async signin_seller(@Body() userInfo: LoginDto, @Req() req: RequestExpressSession, @Res() res: Response) {
		const role: Role = Role.SELLER;
		return (await this.authService.signin(userInfo, role, req, res));
	}

	@Post('signup/seller')
	async signup_seller(@Body() userInfo: CreateUserDto, @Req() req: RequestExpressSession, @Res() res: Response) {
		userInfo.role = Role.SELLER;
		return (await this.authService.signup(userInfo, req, res));
	}

	@Post('signin/admin')
	async signin_admin(@Body() userInfo: LoginDto, @Req() req: RequestExpressSession, @Res() res: Response) {
		const role: Role = Role.ADMIN;
		return (await this.authService.signin(userInfo, role, req, res));
	}
	
	@UseGuards(JwtAuthGuard)
	@Post('logout')
	async logout(@Req() req: RequestExpressSession, @Res() res: Response) {
		return this.authService.signout(req, res);
	}

	@UseGuards(JwtAuthGuard)
	@Get('session')
	async getSession(@Req() req: RequestExpressSession) {
		if (!req.session.user) {
			throw new UnauthorizedException('Aucune session active');
		}
		return req.session.user;
	}

	@Post('send-email')
	async send_email(@Body() body: SendEmailDto) {
		return (await this.sendEmail.requestPasswordReset(body));
	}

	@Post('reset-password')
	async reset_password(@Body() body: ResetPasswordDto, @Query('token') token: string) {
		return (await this.authService.resetPassword(token, body));
	}

	/*@Post('me/admin/signup')
	async signup_admin(@Body() userInfo: CreateUserDto) {
		userInfo.role = Role.ADMIN;
		return (await this.authService.signup(userInfo));
	}*/
}
