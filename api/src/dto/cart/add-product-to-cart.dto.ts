/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   add-product-to-cart.dto.ts                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/26 00:57:22 by mbah              #+#    #+#             */
/*   Updated: 2025/03/26 01:06:16 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { IsInt, IsUUID, Min } from 'class-validator';

/**
 * represente le model CartItem dans le schema de prisma
 */
export class AddProductToCartDto {
	@IsInt()
	@Min(1)
	quantity: number
}