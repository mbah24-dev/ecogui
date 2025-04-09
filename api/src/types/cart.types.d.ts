/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   cart.types.d.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/26 12:37:37 by mbah              #+#    #+#             */
/*   Updated: 2025/03/26 12:42:48 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export type Cart = {
	id: string,
	userId: string,
	items: [{
		id: string,
		cartId: string,
		productId: string,
		quantity: number
	}]
}
