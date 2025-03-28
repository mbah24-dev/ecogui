/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   transaction-utils.service.ts                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/26 14:06:41 by mbah              #+#    #+#             */
/*   Updated: 2025/03/27 21:18:37 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProductStatus } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TransactionUtils {
	constructor(private readonly prismaService: PrismaService) {}

	async update_product_stock(product: any, prisma: any, quantity: number, op: string) {
		try {
			await prisma.product.update({
				where: { id: product.id },
				data: {
				  stock: (op === '-') ? product.stock - quantity : product.stock + quantity,
				  status: (op === '-') ? 
				  		product.stock - quantity === 0 ? 
						ProductStatus.SOLD_OUT : product.status :
						ProductStatus.AVAILABLE
				}
			  });
		} catch (error) {
			throw new HttpException('Impossible de mettre a jour le stock', HttpStatus.BAD_REQUEST);
		}
	}
	
	async add_cart_items_to_order_items(user_cart: any, prisma: any, order: any) {
		 // 3.2 Ajoute les produits à la commande
		 for (const item of user_cart.items) {
			const product = await prisma.product.findUnique({
			  where: { id: item.productId }
			});
			if (!product)
			  throw new HttpException('Ce produit est introuvable', HttpStatus.NOT_FOUND);
			try {
				await prisma.orderItem.create({
					data: {
					  orderId: order.id,
					  productId: item.productId,
					  sellerId: product.sellerId,
					  quantity: item.quantity,
					  price: product.price
					}
				  });
			} catch (error) {
				throw new HttpException(error.message || 'Impossible d\'ajouter ce produit a la commande', HttpStatus.BAD_REQUEST);
			}
			// 3.3 Met à jour le stock
			await this.update_product_stock(product, prisma, item.quantity, '-');
		  }
	}
}