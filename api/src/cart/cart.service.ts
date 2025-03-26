/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   cart.service.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/26 03:42:58 by mbah              #+#    #+#             */
/*   Updated: 2025/03/26 13:38:06 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductStatus } from '@prisma/client';
import { AddProductToCartDto } from 'src/dto/cart/add-product-to-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
	constructor(private readonly prismaService: PrismaService) {}

	async add_product_to_cart(item: { productId: string, userId: string }) {
		let current_user_cart = await this.prismaService.cart.findUnique({
		  where: { userId: item.userId },
		  include: { items: true },
		});
	  
		if (!current_user_cart) {
		  current_user_cart = await this.prismaService.cart.create({
			data: {
			  userId: item.userId,
			  items: { create: [] },
			},
			include: { items: true }
		  });
		}
	  
		const product = await this.prismaService.product.findUnique({
		  where: { id: item.productId },
		});
	  
		if (!product || product.status === ProductStatus.SOLD_OUT) {
		  throw new HttpException('⚠️ Ce produit est actuellement en rupture de stock.', HttpStatus.BAD_REQUEST);
		}
	  
		const existingItem = await this.prismaService.cartItem.findFirst({
		  where: {
			cartId: current_user_cart.id,
			productId: item.productId,
		  },
		});
	  
		if (existingItem) {
		  throw new HttpException('Produit déjà ajouté dans le panier', HttpStatus.BAD_REQUEST);
		}
	  
		const newItem = await this.prismaService.cartItem.create({
		  data: {
			productId: item.productId,
			cartId: current_user_cart.id,
			quantity: 1,
		  },
		});
	  
		return (newItem);
	}

	async delete_an_product_to_cart(productId: string, userId: string) {
		const user_cart = await this.prismaService.cart.findFirst({
		  where: { userId },
		  include: { items: true }, // On inclut les items pour vérifier leur existence
		});
	  
		if (!user_cart) {
		  throw new HttpException(`Aucun panier trouvé, contacter: ${process.env.BCONNECT_EMAIL}`, HttpStatus.BAD_REQUEST);
		}
	  
		const existingItem = user_cart.items.find(item => item.productId === productId);
	  
		if (!existingItem) {
		  throw new HttpException("Ce produit n'existe pas dans votre panier.", HttpStatus.BAD_REQUEST);
		}
	  
		// Suppression de l'élément du panier
		const item_deleted = await this.prismaService.cartItem.delete({
		  where: { id: existingItem.id },
		});
	  
		return (item_deleted);
	}

	async clear_the_cart(userId: string) {
		const user_cart = await this.prismaService.cart.findUnique({
		  where: { userId },
		  include: { items: true },
		});
	  
		if (!user_cart || user_cart.items.length === 0) {
		  throw new HttpException(`Aucun panier trouvé ou panier déjà vide, contacter: ${process.env.BCONNECT_EMAIL}`, HttpStatus.BAD_REQUEST);
		}
		// Supprime tous les items du panier dans une seule transaction
		await this.prismaService.$transaction(
		  user_cart.items.map((item) =>
			this.prismaService.cartItem.delete({ where: { id: item.id } })
		  )
		);
		return { message: "Le panier a été vidé avec succès." };
	}

	async update_an_product_to_cart(productId: string, userId: string, quantity: number) {
		const	user_cart = await this.prismaService.cart.findUnique({
			where: { userId },
			include: { items: true }
		});
		if (!user_cart || user_cart.items.length === 0) {
			throw new HttpException(
				`Aucun panier trouvé ou panier déjà vide, contactez: ${process.env.BCONNECT_EMAIL}`,
				HttpStatus.BAD_REQUEST
			);
		}
		const product = await this.prismaService.product.findUnique({
			where: { id: productId }
		});
		if (!product) {
			throw new HttpException(
				`Aucun produit trouvé, contactez: ${process.env.BCONNECT_EMAIL}`,
				HttpStatus.BAD_REQUEST
			);
		}
		if (product.stock < quantity) {
			throw new HttpException(
				`Cette quantiter n\'est pas disponible en stock, disponile: ${product.stock} articles.`,
				HttpStatus.BAD_REQUEST
			);
		}
		const item_to_update = user_cart.items.find(item => item.productId === productId);
		if (!item_to_update) {
			throw new HttpException(
				'Ce produit n\'est pas dans votre panier.',
				HttpStatus.BAD_REQUEST
			);
		}
		const item_updated = await  this.prismaService.cartItem.update({
			where: { id: item_to_update.id },
			data: {
				quantity
			}
		});
		return (item_updated);
	}

	async get_current_user_cart(userId: string) {
		const cart = await this.prismaService.cart.findMany({
			where: { userId },
			include: { items: true }
		});
		if (!cart || cart.length === 0)
			throw new HttpException('Votre panier est vide', HttpStatus.NOT_FOUND);
		return (cart);
	}
	
}
