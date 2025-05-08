/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   review.model.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/24 18:26:35 by mbah              #+#    #+#             */
/*   Updated: 2025/04/24 18:30:52 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { User } from "../user/user.model";
import { Product } from "./product.model";

export interface Review {
    id: string;
    userId: string;
    productId: string;
    createdAt: string;
    message: string;
    rating: number;
    product: Product;
    user: User;
}
