/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   order.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/29 01:24:50 by mbah              #+#    #+#             */
/*   Updated: 2025/03/29 01:25:05 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { OrderItemStatus } from "@prisma/client";

export interface OrderItem {
	id: string;
	price: number;
	status: OrderItemStatus;
	sellerId: string;
	orderId: string;
	productId: string;
	quantity: number;
	product: { // Relation avec Product
	  name: string;
	};
	seller: { // Relation avec User (Vendeur)
	  name: string;
	};
}