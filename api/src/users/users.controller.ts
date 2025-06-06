/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   users.controller.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/12 17:45:33 by mbah              #+#    #+#             */
/*   Updated: 2025/05/08 17:20:12 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Body, Controller, Delete, ForbiddenException, Get, HttpException, HttpStatus,
	Param, Post, Put, Req, Request, Res, UploadedFile, UseGuards, 
	UseInterceptors} from '@nestjs/common';
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
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiConsumes } from '@nestjs/swagger'; // Importation des décorateurs Swagger
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from 'src/dto/users/update-user.dto';
import { sanitizeUser } from 'src/utility/sanitize_user';

@ApiTags('Users') // Etiquette pour regrouper les routes liées aux utilisateurs
@Controller('users')
export class UsersController {
	constructor(private readonly _users_service: UsersService) {}

	@Post('profile-pic')
	@UseInterceptors(FileInterceptor('image')) // "image" = nom du champ côté Angular
	@ApiOperation({ summary: 'Met à jour la photo de profil de l’utilisateur' })
	@ApiConsumes('multipart/form-data')
	@ApiBody({
	schema: {
		type: 'object',
		properties: {
		image: {
			type: 'string',
			format: 'binary'
		}
		}
	}
	})
	async updateProfilePic(
	@UploadedFile() file: Express.Multer.File,
	@Req() req: RequestExpressSession,
	@Res() res: Response
	) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}

		try {
			const updatedUser = await this._users_service.set_user_profilePic(req.session.user.id, file);
			req.session.user = sanitizeUser(updatedUser);
			return res.json({ message: 'Image mise à jour avec succès', user: updatedUser });
		} catch (error) {
			return res.status(400).json({ message: error.message || 'Erreur lors de la mise à jour de l’image' });
		}
	}
		
	@Get()
	@UseGuards(AdminGuard)
	@IsAdmin()
	@ApiOperation({ summary: 'Récupérer tous les utilisateurs.' })
	@ApiResponse({ status: 200, description: 'Liste des utilisateurs récupérée avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async get_users(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const users = await this._users_service.get_users();
		return res.json({ users });
	}

	@Get(':user_id')
	@UseGuards(AdminGuard)
	@IsAdmin()
	@ApiOperation({ summary: 'Récupérer un utilisateur par son ID (admin).' })
	@ApiParam({ name: 'user_id', description: 'ID de l\'utilisateur à récupérer.' })
	@ApiResponse({ status: 200, description: 'Utilisateur récupéré avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async get_user_by_ID_and_admin(@Param('user_id') user_id: string, 
		@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const user = await this._users_service.get_user_by_ID(user_id);
		return res.json({ user });
	}

	@Get('me/info')
	@ApiOperation({ summary: 'Récupérer les informations de l\'utilisateur connecté.' })
	@ApiResponse({ status: 200, description: 'Informations de l\'utilisateur récupérées avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async get_current_user(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		return res.json({ user: req.session.user });
	}

	@Get('me/role')
	@ApiOperation({ summary: 'Récupérer le rôle de l\'utilisateur connecté.' })
	@ApiResponse({ status: 200, description: 'Rôle de l\'utilisateur récupéré avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async get_user_role(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const role: Role = await this._users_service.get_users_role(req.session.user.id);
		return res.json({ role });
	}

	@Delete(':user_id')
	@UseGuards(AdminGuard)
	@IsAdmin()
	@ApiOperation({ summary: 'Supprimer un utilisateur par son ID (admin).' })
	@ApiParam({ name: 'user_id', description: 'ID de l\'utilisateur à supprimer.' })
	@ApiResponse({ status: 200, description: 'Utilisateur supprimé avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async delete_user_by_admin(@Param('user_id') user_id: string,
		@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const user = await this._users_service.delete_user(user_id);
		req.session.user = sanitizeUser(user);
		return res.json({ user });
	}

	@Delete('me/account')
	@ApiOperation({ summary: 'Supprimer le compte de l\'utilisateur connecté.' })
	@ApiResponse({ status: 200, description: 'Compte utilisateur supprimé avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async delete_user(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		if (req.session.user.role === Role.RESTRICTED) {
			throw new ForbiddenException('Les utilisateurs restreints ne peuvent pas supprimer leur compte');
		}
		const user = await this._users_service.delete_user(req.session.user.id);
		req.session.user = sanitizeUser(user);
		return res.json({ user });
	}

	@Put('me/account')
	@ApiOperation({ summary: 'Mettre à jour le compte de l\'utilisateur connecté.' })
	@ApiBody({ type: UpdateUserDto })
	@ApiResponse({ status: 200, description: 'Compte utilisateur mis à jour avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async update_user(
		@Body() userInfoBody: UpdateUserDto,
		@Req() req: RequestExpressSession,
		@Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		if (req.session.user.role === Role.RESTRICTED) {
			throw new ForbiddenException('Les utilisateurs restreints ne peuvent pas modifier leur compte');
		}
		const user = await this._users_service.update_user(req.session.user.id, userInfoBody);
		req.session.user = sanitizeUser(user);
		return res.json({ user: req.session.user });
	}

	@Put(':user_id')
	@UseGuards(AdminGuard)
	@IsAdmin()
	@ApiOperation({ summary: 'Mettre à jour un utilisateur par son ID (admin).' })
	@ApiParam({ name: 'user_id', description: 'ID de l\'utilisateur à mettre à jour.' })
	@ApiBody({ type: CreateUserDto })
	@ApiResponse({ status: 200, description: 'Utilisateur mis à jour avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async update_user_by_admin(
		@Param('user_id') user_id: string,
		@Body() userInfoBody: UpdateUserDto,
		@Req() req: RequestExpressSession, @Res() res: Response
	) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const user = await this._users_service.update_user(user_id, userInfoBody);
		req.session.user = sanitizeUser(user);
		return res.json({ user });
	}

	@Put('set-role/:user_id')
	@UseGuards(AdminGuard)
	@IsAdmin()
	@ApiOperation({ summary: 'Définir le rôle d\'un utilisateur par son ID.' })
	@ApiParam({ name: 'user_id', description: 'ID de l\'utilisateur pour modifier son rôle.' })
	@ApiBody({ type: SetUserRoleDto })
	@ApiResponse({ status: 200, description: 'Rôle de l\'utilisateur mis à jour avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async set_user_role(
		@Body() data: SetUserRoleDto,
		@Param('user_id') user_id: string,
		@Req() req: RequestExpressSession, @Res() res: Response
	) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const user = await this._users_service.set_user_role(user_id, data.role);
		req.session.user = sanitizeUser(user);
		return res.json({ user });
	}

	@Get('connected/products')
	@UseGuards(AdminOrSellerGuard)
	@IsSeller()
	@IsAdmin()
	@ApiOperation({ summary: 'Récupérer les produits du vendeur ou administrateur connecté.' })
	@ApiResponse({ status: 200, description: 'Produits du vendeur récupérés avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async get_current_user_produtcs(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const products = await this._users_service.get_current_user_products(req.session.user.id);
		return res.json({ products });
	}

	@Get('connected/products/sold')
	@UseGuards(AdminOrSellerGuard)
	@IsSeller()
	@ApiOperation({ summary: 'Récupérer les produits vendus par le vendeur ou administrateur connecté.' })
	@ApiResponse({ status: 200, description: 'Produits vendus récupérés avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async get_current_user_produtcsSold(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const products = await this._users_service.get_current_user_produtcsSold(req.session.user.id);
		return res.json({ products });
	}
}
