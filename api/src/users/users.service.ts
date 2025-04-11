/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   users.service.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/15 23:26:22 by mbah              #+#    #+#             */
/*   Updated: 2025/04/11 03:24:50 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderItemStatus, ProductStatus, Role } from '@prisma/client';
import { BcryptUtilsService } from 'src/bcrypt-utils/bcrypt-utils.service';
import { CreateUserDto } from 'src/dto/users/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
	constructor(
		private readonly _prisma: PrismaService,
		private readonly _bcrypt: BcryptUtilsService
	) {}

	async get_user_by_ID(user_Id: string) {
		const user = await this._prisma.user.findUnique({
			where: { id: user_Id }
		});
		if (!user)
			throw new HttpException('Cet utilisateur n\'existe pas', HttpStatus.NOT_FOUND);
		return (user);
	}

	async get_users() {
		const users = await this._prisma.user.findMany();
		if (!users || users.length === 0)
			throw new HttpException('Aucun utilisateur trouvé', HttpStatus.NOT_FOUND);
		return (users);
	}

	async get_users_role(user_Id: string) {
		const user = await this.get_user_by_ID(user_Id);
		return (user.role);
	}

	async create_user(user_info: CreateUserDto) {
		const {email, password, name, role}: CreateUserDto = user_info;
		const user_found = await this._prisma.user.findUnique({
			where: { email }
		});
		if (user_found)
			throw new HttpException('Cet email est déjà associé à un compte.', HttpStatus.FOUND);
		const hashedPassword = await this._bcrypt.hashPassword(password);
		const new_user = await this._prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
				role: role || Role.BUYER
			}
		});
		return ({ user_Id: new_user.id });
	}

	async update_user(user_Id: string, new_user: CreateUserDto) {
		let hashedPassword: any;
		
		const	user_to_update = await this._prisma.user.findUnique({
			where: { id: user_Id }
		});
		if (!user_to_update)
			throw new HttpException('Cet utilisateur n\'existe pas', HttpStatus.NOT_FOUND);
		if (new_user.password)
			hashedPassword = await this._bcrypt.hashPassword(new_user.password);
		return (
			await this._prisma.user.update({
				where: { id: user_Id },
				data: { 
					email: new_user.email,
					password: hashedPassword,
					name: new_user.name,
					role: new_user.role
				 }
			})
		);
	}

	async delete_user(user_Id: string) {
		try {
			return (
				{
					message: 'cet utilisateur a été supprimer',
					user_deleted: await this._prisma.user.delete({
						where: { id: user_Id }
					})
			}
			);
		} catch (error) {
			throw new HttpException('Impossible de supprimer l\'utilisateur ', HttpStatus.BAD_REQUEST);
		}
	}

	async set_user_role(user_Id: string, role: Role) {
		try {
			return (await this._prisma.user.update({
				where: { id: user_Id },
				data: { role: role}
			}))
		} catch (error) {
			throw new HttpException(error.message || 'un probleme es survenue lors de la modification', HttpStatus.BAD_REQUEST);
		}
	}

	async get_current_user_products(userId: string) {
		const user = await this._prisma.user.findUnique({
			where: {
				id: userId
			},
			include: {
				products: { include: { images: true } }
			}
		});
	
		if (!user || user.products.length === 0)
			throw new HttpException('Aucun produit trouvé', HttpStatus.NOT_FOUND);
	
		// Filtre les produits dont le statut est différent de ProductStatus.ARCHIVED
		const activeProducts = user.products.filter(product => product.status !== ProductStatus.ARCHIVED);
	
		if (activeProducts.length === 0) {
			throw new HttpException('Aucun produit actif trouvé', HttpStatus.NOT_FOUND);
		}
	
		return activeProducts;
	}
	

	async get_current_user_produtcsSold(userId: string) {
		try {
			const productsSold = await this._prisma.orderItem.findMany({
				where: {
					sellerId: userId,
					status: OrderItemStatus.CONFIRMED
				},
				include: { 
					product: true,
					order: true 
				}
			})
			if (!productsSold || !productsSold.length) throw new HttpException('Aucun produit trouvé', HttpStatus.NOT_FOUND);
			return (productsSold);
		} catch (error) {
			throw new HttpException(error.message || 'Aucun produit trouvé', HttpStatus.NOT_FOUND);
		}
	}
}
