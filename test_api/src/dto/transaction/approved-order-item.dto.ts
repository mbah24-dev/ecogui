/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   approved-order-item.dto.ts                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/26 18:26:44 by mbah              #+#    #+#             */
/*   Updated: 2025/03/26 18:29:38 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { OrderItemStatus } from "@prisma/client";
import { IsString, IsUUID } from "class-validator";

export class ApproveOrderItemDto {
	@IsUUID()
	productId: string;

	@IsUUID()
	orderId: string;

	@IsString()
	decision: OrderItemStatus
}