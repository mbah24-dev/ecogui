/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   order.model.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/24 18:27:55 by mbah              #+#    #+#             */
/*   Updated: 2025/04/24 18:32:55 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Product } from "../product/product.model";
import { Invoice } from "./invoice.model";
import { User } from "./user.model";

export interface Order {
  id: string;
  buyerId: string;
  status: OrderStatus;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  buyer: User;
  items: OrderItem[];
  invoices: Invoice[];
}

export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
    sellerId: string;
    status: OrderItemStatus;
    order: Order;
    product: Product;
    seller: User;
}

export enum OrderItemStatus {
    CONFIRMED = 'CONFIRMED',
    PENDING = 'PENDING',
    REFUSED = 'REFUSED',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
  CONFIRMED = 'CONFIRMED',
  PARTIAL = 'PARTIAL',
}
