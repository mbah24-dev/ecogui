/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   cart.model.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/24 18:23:48 by mbah              #+#    #+#             */
/*   Updated: 2025/04/24 18:31:35 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { User } from "../user/user.model";
import { Product } from "./product.model";

export interface Cart {
    id: string;
    userId: string;
    total: number;
    user: User;
    items: CartItem[];
  }

  export interface CartItem {
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
    cart: Cart;
    product: Product;
  }
