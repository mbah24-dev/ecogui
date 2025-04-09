/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   cart.service.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/26 03:42:58 by mbah              #+#    #+#             */
/*   Updated: 2025/03/27 21:05:07 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
	constructor(private readonly prismaService: PrismaService) {}

	// Récupération du coût en une seule requête
	private async get_order_cost(cartId: string): Promise<number> {
		const cartItems = await this.prismaService.cartItem.findMany({
			where: { cartId },
			select: { quantity: true, product: { select: { price: true } } }
		});
		return (cartItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0));
	}

	// Ajout d'un produit au panier
	async add_product_to_cart({ productId, userId }: { productId: string, userId: string }) {
		let current_user_cart = await this.prismaService.cart.findUnique({
			where: { userId },
			include: { items: true }
		});

		if (!current_user_cart) {
			current_user_cart = await this.prismaService.cart.create({
				data: { userId },
				include: { items: true }
			});
		}

		const product = await this.prismaService.product.findUnique({
			where: { id: productId, status: { not: ProductStatus.SOLD_OUT } }
		});

		if (!product)
			throw new HttpException('Ce produit est en rupture de stock.', HttpStatus.BAD_REQUEST);

		if (product.status === ProductStatus.PENDING)
			throw new HttpException('Ce produit n\'a pas encore été validé par l\'admin', HttpStatus.BAD_REQUEST);

		const existingItem = current_user_cart.items.find(item => item.productId === productId);

		if (existingItem)
			throw new HttpException('Produit déjà ajouté au panier', HttpStatus.BAD_REQUEST);

		await this.prismaService.cartItem.create({
			data: { productId, cartId: current_user_cart.id, quantity: 1 }
		});

		const newTotal = await this.get_order_cost(current_user_cart.id);
		await this.prismaService.cart.update({
			where: { id: current_user_cart.id },
			data: { total: newTotal }
		});

		return { message: 'Produit ajouté au panier avec succès', total: newTotal };
	}


	// Suppression d'un produit du panier
	async delete_an_product_to_cart(productId: string, userId: string) {
		const user_cart = await this.prismaService.cart.findUnique({
			where: { userId },
			include: { items: { where: { productId } } }
		});

		if (!user_cart || user_cart.items.length === 0) {
			throw new HttpException("Ce produit n'existe pas dans votre panier.", HttpStatus.BAD_REQUEST);
		}

		// Transaction : Suppression de l'item + Mise à jour du total
		const [item_deleted] = await this.prismaService.$transaction([
			this.prismaService.cartItem.delete({ where: { id: user_cart.items[0].id } }),
			this.prismaService.cart.update({
				where: { id: user_cart.id },
				data: { total: await this.get_order_cost(user_cart.id) }
			})
		]);

		return (item_deleted);
	}

	// Vide le panier
	async clear_the_cart(userId: string) {
		const user_cart = await this.prismaService.cart.findUnique({
			where: { userId },
			include: { items: true }
		});

		if (!user_cart || !user_cart.items.length) {
			throw new HttpException("Votre panier est déjà vide.", HttpStatus.BAD_REQUEST);
		}

		// Transaction : Suppression de tous les items + Mise à jour du total
		await this.prismaService.$transaction([
			this.prismaService.cartItem.deleteMany({ where: { cartId: user_cart.id } }),
			this.prismaService.cart.update({
				where: { id: user_cart.id },
				data: { total: 0 }
			})
		]);

		return ({ message: "Le panier a été vidé avec succès." });
	}

	// Mise à jour de la quantité d'un produit dans le panier
	async update_an_product_to_cart(productId: string, userId: string, quantity: number) {
		const user_cart = await this.prismaService.cart.findUnique({
			where: { userId },
			include: { items: true }
		});

		if (!user_cart || user_cart.items.length === 0) {
			throw new HttpException("Votre panier est vide.", HttpStatus.BAD_REQUEST);
		}

		const product = await this.prismaService.product.findUnique({
			where: { id: productId },
			select: { stock: true }
		});

		if (!product || product.stock < quantity) {
			throw new HttpException(`Stock insuffisant. Disponible : ${product?.stock || 0} articles.`, HttpStatus.BAD_REQUEST);
		}

		const item_to_update = user_cart.items.find(item => item.productId === productId);
		if (!item_to_update) {
			throw new HttpException("Ce produit n'est pas dans votre panier.", HttpStatus.BAD_REQUEST);
		}
		await this.prismaService.cartItem.update({
				where: { id: item_to_update.id },
				data: { quantity }
		});
		const new_total = await this.get_order_cost(user_cart.id);
		await this.prismaService.cart.update({
			where: { id: user_cart.id },
			data: { total: new_total }
		});
		return { message: "Quantité mise à jour avec succès", total: new_total };
	}



	// Récupére le panier de l'utilisateur
	async get_current_user_cart(userId: string) {
		const cart = await this.prismaService.cart.findUnique({
			where: { userId },
			include: { items: { include: { product: true } } }
		});

		if (!cart || !cart.items.length) {
			throw new HttpException("Votre panier est vide", HttpStatus.NOT_FOUND);
		}

		return (cart);
	}
}

