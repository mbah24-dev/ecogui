/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   users.service.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/15 23:26:22 by mbah              #+#    #+#             */
/*   Updated: 2025/05/05 00:57:00 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { ne } from '@faker-js/faker/.';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderItemStatus, Prisma, PrismaClient, ProductStatus, Role } from '@prisma/client';
import { BcryptUtilsService } from 'src/bcrypt-utils/bcrypt-utils.service';
import { CreateUserDto } from 'src/dto/users/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { get_upload_path } from "src/utility/get_path";
import { UpdateUserDto } from 'src/dto/users/update-user.dto';
import { AddressService } from 'src/address/address.service';
import { CreateAddressDto } from 'src/dto/address/create-address.dto';
import { City } from 'src/types/address.types';

@Injectable()
export class UsersService {
	constructor(
		private readonly _prisma: PrismaService,
		private readonly _bcrypt: BcryptUtilsService,
		private readonly _addressService: AddressService
	) {}

	async upload_user_profile_pic(file: Express.Multer.File) {
		try {
			const extension = file.mimetype.split('/')[1];
			const imageName = `${uuid.v4()}.${extension}`;
			const uploadDir = get_upload_path('images', 'user_profiles');
			const imagePath = path.join(uploadDir, imageName);
		
			if (!fs.existsSync(path.dirname(imagePath))) {
			fs.mkdirSync(path.dirname(imagePath), { recursive: true });
			}
		
			await sharp(file.buffer)
			.resize(300, 300)
			.toFile(imagePath);
		
			return (imageName);
		} catch (error) {
			throw new HttpException('Erreur lors de l\'upload de la photo de profil', HttpStatus.BAD_REQUEST);
		}
	}

	async set_user_profilePic(userId: string, file: Express.Multer.File): Promise<any> {
		const imageName = await this.upload_user_profile_pic(file);
	  
		const updatedUser = await this._prisma.user.update({
		  where: { id: userId },
		  data: {
			profilePic: imageName
		  }
		});
	  
		return (updatedUser);
	}
	  
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

	async create_user(
		user_info: CreateUserDto,
		prisma: PrismaClient | Prisma.TransactionClient = this._prisma,
	) {
		const { email, password, name, role } = user_info;
	
		const existing = await prisma.user.findUnique({ where: { email } });
		if (existing)
			throw new HttpException('Cet email est déjà associé à un compte.', HttpStatus.FOUND);
	
		const hashedPassword = await this._bcrypt.hashPassword(password);
	
		const newUser = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
				role: role || Role.BUYER,
			},
		});
	
		const defaultAddress: CreateAddressDto = {
			commune: '',
			city: City.Conakry,
			country: 'Guinée',
			description: '',
		};
		await this._addressService.add_address(newUser.id, defaultAddress, prisma);
	
		return { user_Id: newUser.id };
	}

	async update_user(user_Id: string, new_user: UpdateUserDto) {
		const user_to_update = await this._prisma.user.findUnique({
		  where: { id: user_Id },
		});
	  
		if (!user_to_update)
		  throw new HttpException('Cet utilisateur n\'existe pas', HttpStatus.NOT_FOUND);
	  
		if (new_user.password && new_user.old_password) {
			const isValid = await this._bcrypt.isValidPassword(new_user.old_password, user_to_update.password);
			if (!isValid) {
			  throw new HttpException("L'ancien mot de passe est incorrect !", HttpStatus.BAD_REQUEST);
			}
			new_user.password = await this._bcrypt.hashPassword(new_user.password);
		}
		  
		// Supprime explicitement le champ old_password
		const { old_password, ...userData } = new_user;
		  
		const cleanedData = Object.fromEntries(
			Object.entries(userData).filter(([_, value]) => value !== undefined && value !== '')
		);
		  
		return await this._prisma.user.update({
			where: { id: user_Id },
			data: cleanedData,
		});
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
			}));
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
