/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   auth.controller.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/15 23:06:39 by mbah              #+#    #+#             */
/*   Updated: 2025/03/17 18:47:24 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Body, Controller, Get, Post, UseGuards, Request, Req, UnauthorizedException, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestWithUser } from './jwt.strategy';
import { LoginDto } from 'src/dto/login-user.dto';
import { Role } from '@prisma/client';
import { Request as RequestExpressSession, Response } from 'express';


@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UsersService
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
		const role: Role = Role.BUYER;
		return (await this.authService.signin(userInfo, role, req, res));
	}

	@Post('signup/buyer')
	async signup_buyer(@Body() userInfo: CreateUserDto) {
		return (await this.authService.signup(userInfo));
	}

	@Post('signin/seller')
	async signin_seller(@Body() userInfo: LoginDto, @Req() req: RequestExpressSession, @Res() res: Response) {
		const role: Role = Role.SELLER;
		return (await this.authService.signin(userInfo, role, req, res));
	}

	@Post('signup/seller')
	async signup_seller(@Body() userInfo: CreateUserDto) {
		userInfo.role = Role.SELLER;
		return (await this.authService.signup(userInfo));
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

	/*@Post('me/admin/signup')
	async signup_admin(@Body() userInfo: CreateUserDto) {
		userInfo.role = Role.ADMIN;
		return (await this.authService.signup(userInfo));
	}*/
}
