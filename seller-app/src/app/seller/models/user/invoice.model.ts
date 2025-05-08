/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   invoice.model.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/24 18:27:12 by mbah              #+#    #+#             */
/*   Updated: 2025/04/24 18:30:45 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Order } from "./order.model";

export interface Invoice {
    id: string;
    orderId: string;
    totalAmount: number;
    pdfUrl?: string;
    status: InvoiceStatus;
    createdAt: string;
    order: Order;
}

export enum InvoiceStatus {
    GENERATED = 'GENERATED',
    SENT = 'SENT',
    PAID = 'PAID',
    CANCELED = 'CANCELED',
}
