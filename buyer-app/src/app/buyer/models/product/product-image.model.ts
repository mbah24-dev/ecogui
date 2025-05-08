/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   product-image.model.ts                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/24 18:24:47 by mbah              #+#    #+#             */
/*   Updated: 2025/04/24 18:31:16 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Product } from "./product.model";

export interface ProductImage {
    id: string;
    url: string;
    productId: string;
    product: Product;
}
