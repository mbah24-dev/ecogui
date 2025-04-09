/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   invoice.types.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/31 01:16:04 by mbah              #+#    #+#             */
/*   Updated: 2025/03/31 01:17:15 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export type sellerData = {
	name: string;
	orderId: any;
	orderDate: any;
	sellerProducts: any;
	sellerTotal: any;
	seller_address: {
		id: string;
		description: string;
		createdAt: Date;
		userId: string;
		commune: string | null;
		city: string;
		country: string;
	};
}
