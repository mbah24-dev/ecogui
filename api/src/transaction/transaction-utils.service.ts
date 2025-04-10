/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   transaction-utils.service.ts                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/26 14:06:41 by mbah              #+#    #+#             */
/*   Updated: 2025/04/10 04:34:11 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProductStatus } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TransactionUtils {
	constructor(private readonly prismaService: PrismaService) {}

	async update_product_stock(product: any, prisma: any, quantity: number, op: '+' | '-') {
		try {
			const newStock = op === '-' 
				? Math.max(product.stock - quantity, 0)
				: product.stock + quantity;
	
			const newStatus = newStock === 0 
				? ProductStatus.SOLD_OUT 
				: ProductStatus.AVAILABLE;
	
			await prisma.product.update({
				where: { id: product.id },
				data: {
					stock: newStock,
					status: newStatus
				}
			});
		} catch (error) {
			throw new HttpException('Impossible de mettre à jour le stock', HttpStatus.BAD_REQUEST);
		}
	}	
	
	async add_cart_items_to_order_items(user_cart: any, prisma: any, order: any) {
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
			await this.update_product_stock(product, prisma, item.quantity, '-');
		  }
	}
}