/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   invoice.types.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/31 01:16:04 by mbah              #+#    #+#             */
/*   Updated: 2025/04/11 00:54:57 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { InvoiceStatus } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";


export type InvoiceType = {
	id: string;
	createdAt: Date;
	status: InvoiceStatus;
	orderId: string;
	totalAmount: Decimal;
	pdfUrl: string | null;
};

export type InvoicesArray = InvoiceType[];

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
