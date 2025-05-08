/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.model.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/24 18:24:21 by mbah              #+#    #+#             */
/*   Updated: 2025/04/24 18:33:11 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Address } from "cluster";
import { Cart } from "../product/cart.model";
import { Product } from "../product/product.model";
import { Review } from "../product/review.model";
import { Order, OrderItem } from "./order.model";
import { Role } from "./role.model";


export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    role: Role;
    createdAt: string;
    updatedAt: string;
    resetToken?: string;
    balance: number;
    profilePic?: string;
    isOnline: boolean;
    countryCode?: string;
    phoneNumber?: string;
    score: number;
    addresses: Address[];
    cart?: Cart;
    orders: Order[];
    soldProducts: OrderItem[];
    products: Product[];
    reviews: Review[];
}
