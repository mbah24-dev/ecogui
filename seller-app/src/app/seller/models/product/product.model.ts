/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   product.model.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/24 18:28:45 by mbah              #+#    #+#             */
/*   Updated: 2025/04/24 18:33:18 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { OrderItem } from "../user/order.model";
import { User } from "../user/user.model";
import { CartItem } from "./cart.model";
import { Category } from "./category.model";
import { ProductImage } from "./product-image.model";
import { Review } from "./review.model";

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    size: string[];
    color: string[];
    categoryId: string;
    sellerId: string;
    createdAt: string;
    updatedAt: string;
    status: ProductStatus;
    buyCount: number;
    cartItems: CartItem[];
    orderItems: OrderItem;
    category: Category;
    seller: User;
    images: ProductImage[];
    reviews: Review[];
}

export enum ProductStatus {
    AVAILABLE = 'AVAILABLE',
    SOLD_OUT = 'SOLD_OUT',
    PENDING = 'PENDING',
    ARCHIVED = 'ARCHIVED',
}
