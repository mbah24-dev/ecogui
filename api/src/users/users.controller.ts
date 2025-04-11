/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   users.controller.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/26 03:44:54 by mbah              #+#    #+#             */
/*   Updated: 2025/04/11 02:21:03 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Body, Controller, Delete, ForbiddenException, Get, HttpException, HttpStatus,
	Param, Post, Put, Req, Request, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/jwt/jwt.strategy';
import { CreateUserDto } from 'src/dto/users/create-user.dto';
import { Role } from '@prisma/client';
import { AdminGuard } from 'src/guards/admin.guard';
import { IsAdmin } from 'src/decorator/is-admin.decorator';
import { SetUserRoleDto } from 'src/dto/users/set-user-role.dto';
import { Request as RequestExpressSession, Response } from 'express';
import { IsSeller } from 'src/decorator/is-seller.decorator';
import { AdminOrSellerGuard } from 'src/guards/admin-or-seller.guard';

@Controller('users')
export class UsersController {
	constructor(private readonly _users_service: UsersService) {}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@IsAdmin()
	@Get()
	async get_users(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const users = (await this._users_service.get_users());
		return (res.json({ users }))
	}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@IsAdmin()
	@Get(':user_id')
	async get_user_by_ID_and_admin(@Param('user_id') user_id: string, 
		@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const user = (await this._users_service.get_user_by_ID(user_id));
		return (res.json({ user }));
	}

	@UseGuards(JwtAuthGuard)
	@Get('me/info')
	async get_current_user(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		return res.json({ user: req.session.user });
	}

	@UseGuards(JwtAuthGuard)
	@Get('me/role')
	async get_user_role(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const role: Role =  await this._users_service.get_users_role(req.session.user.id);
		return res.json({ role });
	}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@IsAdmin()
	@Delete(':user_id')
	async delete_user_by_admin(@Param('user_id') user_id: string,
		@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const user = (await this._users_service.delete_user(user_id));
		return (res.json({ user }))
	}

	@UseGuards(JwtAuthGuard)
	@Delete('me/account')
	async delete_user(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		if (req.session.user.role === Role.RESTRICTED) {
			throw new ForbiddenException('Les utilisateurs restreints ne peuvent pas supprimer leur compte');
		}
		const user = this._users_service.delete_user(req.session.user.id);
		return (res.json({ user }));
	}

	@UseGuards(JwtAuthGuard)
	@Put('me/account')
	async update_user(
		@Body() userInfoBody: CreateUserDto,
		@Req() req: RequestExpressSession,
		@Res() res: Response) {
			if (!req.session.user) {
				return res.status(401).json({ message: 'Utilisateur non connecté' });
			}
			if (req.session.user.role === Role.RESTRICTED) {
				throw new ForbiddenException('Les utilisateurs restreints ne peuvent pas modifier leur compte');
			}
			const user = this._users_service.update_user(req.session.user.id, userInfoBody);
			return (res.json({ user }))
	}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@IsAdmin()
	@Put(':user_id')
	async update_user_by_admin(
		@Param('user_id') user_id: string,
		@Body() userInfoBody: CreateUserDto,
		@Req() req: RequestExpressSession, @Res() res: Response
	) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const user =  (await this._users_service.update_user(user_id, userInfoBody));
		return (res.json({ user }))
	}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@IsAdmin()
	@Put('set-role/:user_id')
	async set_user_role(
		@Body() data: SetUserRoleDto,
		@Param('user_id') user_id: string,
		@Req() req: RequestExpressSession, @Res() res: Response
	) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const user = (await this._users_service.set_user_role(user_id, data.role));
		return (res.json({ user }));
	}

	@UseGuards(JwtAuthGuard, AdminOrSellerGuard)
	@IsSeller()
	@IsAdmin()
	@Get('connected/products')
	async get_current_user_produtcs(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const products = await this._users_service.get_current_user_products(req.session.user.id);
		return (res.json( {products} ));
	}

	@UseGuards(JwtAuthGuard, AdminOrSellerGuard)
	@IsSeller()
	@Get('connected/products/sold')
	async get_current_user_produtcsSold(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const products = await this._users_service.get_current_user_produtcsSold(req.session.user.id);
		return (res.json( {products} ));
	}
}
